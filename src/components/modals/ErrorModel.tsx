import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetChatMessage } from "../../redux/slices/chatSlice";


export const ErrorModel = ({
    isErrorModelOpen,
    setIsErrorModelOpen,
    error,
}: {
    isErrorModelOpen: boolean,
    setIsErrorModelOpen: any,
    error: string,
}) => {
    const dispatch = useDispatch();
    return (
        <div className={`w-full h-screen fixed top-0 left-0 z-10 right-0 backdrop-blur-sm flex justify-center ${isErrorModelOpen ? 'flex' : 'hidden'}`}>
            <div className="p-3 m-2 w-96 h-min bg-blue-400 rounded-md shadow relative flex items-center ">
                <div onClick={() => {
                    dispatch(resetChatMessage("reset message"));
                    setIsErrorModelOpen(false);
                }} className={`absolute right-1 rounded bg-white cursor-pointer`}>
                    <X />
                </div>
                <p className="text-gray-800 ml-1 my-2 text-white text-1xl font-medium">{error}</p>
            </div>
        </div>
    )
}