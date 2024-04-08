import { X,User,Menu, LogOut} from 'lucide-react';
import { convertTimeInActualFormat } from '../../utils/helper';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import SendMessageField from './ui/SendMessageField';
interface Props{
    socket: any,
    handleSendMessage: (text: string,setText: any) => void,
    handleRequest: any,
    mySocketID: string,
}
const ChatBox = ({
    socket,
    handleSendMessage,
    handleRequest,
    mySocketID
}: Props) => {

    const [sideBar, showSideBar] = useState<boolean>(false);
    const chatsMessages = useSelector((state: any) => state.chat);
    const { name, active_users, connectedUserInfo } = useSelector((state: any) => state.user);

    const handleDisconnect = () => {
        socket?.emit('disconnect_from_pairing_socket', {
            id: connectedUserInfo.id
        });
    }

    return (
        <div className="p-2 md:flex md:gap-x-2">
            <div className={`md:w-96 w-auto h-[98vh] bg-slate-200 border-2 border-solid border-black z-10 md:static fixed ${sideBar ? 'block' : 'hidden'} md:block`}>
                <div onClick={() => showSideBar(!sideBar)} className="absolute md:hidden -right-12 top-1 p-2 bg-blue-300">
                    <X />
                </div>
                <div className="flex items-center justify-center gap-x-3 bg-[#333333] py-2 px-2">
                    <User color="white" />
                    <h1 className="text-center text-1xl font-medium text-white">{name}</h1>
                </div>
                <div className="p-2">
                    <p className="font-bold text-2xl">Other users</p>
                    {
                        active_users && active_users.map((socket: any) => (
                            (socket.name !== name) ? (
                                <button onClick={() => {
                                    handleRequest(socket.id);
                                }} className={`flex items-center justify-center py-1 px-3 rounded bg-blue-400 mt-2 relative`} key={socket.id}>
                                    <span className="absolute -right-1 -top-1 w-3 h-3 rounded-[100%] bg-[#80ed99]"></span>
                                    <p className="font-semibold">{socket.name}</p>
                                </button>) : null
                        ))
                    }
                </div>
            </div>

            <div className="flex flex-col border-2 border-solid border-black w-full m-auto h-[98vh] bg-slate-200">
                <div className="flex-1 p-4 w-full h-full relative">
                    <div className="absolute md:hidden left-1 top-1 p-2 bg-white cursor-pointer" onClick={() => showSideBar(!sideBar)}>
                        <div>
                            <Menu />
                        </div>
                    </div>
                    <div className="w-full h-full">
                        {<div className={`w-full h-11 bg-[#118ab2] absolute top-0 left-0 items-center justify-between px-2 ${connectedUserInfo['name'] ? 'flex' : 'hidden'}`}>
                            <h1 className="text-1xl font-medium text-white">You connected with {connectedUserInfo && connectedUserInfo.name} 💑. </h1>
                            <LogOut cursor={'pointer'} color="#fff" onClick={handleDisconnect} />
                        </div>}
                        {
                            chatsMessages.length != 0 ? (
                                <div className="flex flex-col gap-y-2 w-full h-full pt-11">
                                    {
                                        chatsMessages.map((payload: any, index: number) => (
                                            <div key={index} className={`w-full h-auto flex items-center ${mySocketID != payload.id ? 'justify-start' : 'justify-end'}`}>
                                                <div>
                                                    <p className={`font-normal text-lg px-2 text-white rounded-md ${payload.id != mySocketID ? 'bg-red-500' : 'bg-green-500'}`}>{payload.message}</p>
                                                    <span className="text-sm">{convertTimeInActualFormat(payload.time)}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="text-center text-2xl">No messages yet</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <SendMessageField handleSendMessage={handleSendMessage}/>
            </div >
        </div >
    )
}

export default ChatBox