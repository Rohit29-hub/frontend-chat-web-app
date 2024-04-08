import { useState } from "react";
import { setSenderSocket } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
export const SenderModel = ({ isOpen, setIsOpen, senderSocket, socket }:
    {
        isOpen: boolean,
        socket: any,
        setIsOpen: any,
        senderSocket: any
    }) => {
    const [error, setError] = useState<boolean>(false);
    const [showDenyField, setShowDenyField] = useState<boolean>(false);
    const [reasonToDeny, setReasonToDeny] = useState<string>("");
    const dispatch = useDispatch();

    const handleDeny = () => {
        socket?.emit('deny_req', {
            message: reasonToDeny,
            sendToThisID: senderSocket.id
        });
        dispatch(setSenderSocket({}));
        setReasonToDeny("");
        setIsOpen(!isOpen);
    }

    // accept the request
    const handleAccept = () => {
        socket.emit("req_accepted", {
            message: 'request accpeted !',
            fromID: senderSocket.id, // send this message on jis nai request bheji
        })
        setIsOpen(!isOpen);
    }

    return (
        <div className={`w-full h-screen fixed top-0 left-0 z-10 right-0 backdrop-blur-lg flex justify-center ${isOpen ? 'flex' : 'hidden'}`}>
            <div className="p-3 m-2 w-96 h-min bg-blue-400 rounded-md shadow relative">
                <h1 className="text-2xl font-semibold "><span className="text-red-800 text-2xl font-bold">{senderSocket.name}</span>, want to chat you !</h1>
                <p className="text-gray-800 ml-1 my-2">Are your confirm this request ?</p>
                <div className="flex mt-3 items-center justify-end w-full h-auto gap-x-3">
                    <input type="text" onChange={(event) => setReasonToDeny(event.target.value)} placeholder="Reason to Deny" value={reasonToDeny} className={`rounded pl-2 py-2 ${showDenyField ? 'block' : 'hidden'} ${error ? 'border-2 border-solid border-red-600 outline-none' : ''}`} />
                    <button onClick={() => {
                        (showDenyField) ? (reasonToDeny != "") ? handleDeny() : setError(true) : setShowDenyField(true)
                    }} className="px-4 py-2 rounded bg-red-400 font-medium">
                        Deny
                    </button>
                    <button onClick={handleAccept} className="px-4 py-2 rounded bg-green-400 font-medium">
                        Accept
                    </button>
                </div>
            </div>
        </div>
    )
}