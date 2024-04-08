import { delayTask } from "../../utils/helper";
import { X } from "lucide-react";

export const ReciverModel = ({ setResMessageFromChatConnection, resMessageFromChatConnection, reqLoadingForChatConnection, isRequestModelOpen, setIsRequestModelOpen }: {
    resMessageFromChatConnection: any,
    setResMessageFromChatConnection: any,
    reqLoadingForChatConnection: boolean,
    isRequestModelOpen: boolean,
    setIsRequestModelOpen: any,
}) => {
    const { message, success } = resMessageFromChatConnection;

    const hideTheModelAfterReq_accept = (): void => {
        setIsRequestModelOpen(false);
        setResMessageFromChatConnection({
            message: "",
            success: false,
        });
    }

    if (success === true) {
        delayTask(hideTheModelAfterReq_accept, 2000);
    }


    return (
        <div className={`w-full h-screen fixed top-0 left-0 z-20 right-0 backdrop-blur-lg flex justify-center ${isRequestModelOpen ? 'flex' : 'hidden'}`}>
            {
                reqLoadingForChatConnection ? (
                    <div className="p-3 m-2 w-96 h-min bg-blue-400 rounded-md shadow relative flex flex-col items-center justify-center gap-3">
                        <p className="text-2xl font-medium">Wait for response..</p>
                        <span className="loader"></span>
                    </div>
                ) : (
                    <div className={`p-3 m-2 w-96 h-min ${success ? 'bg-green-500' : 'bg-blue-500'} rounded-md shadow relative`}>
                        <div onClick={() => setIsRequestModelOpen(false)} className={`absolute right-1 rounded bg-white cursor-pointer ${success ? 'hidden' : 'block'}`}>
                            <X />
                        </div>
                        <h1>{!success ? (
                            <div>
                                <p className="font-medium">Rejected 😑</p>
                                <p>Reason: {message}</p>
                            </div>
                        ) : (
                            <div>
                                <p className="font-medium">Accepted 🎉</p>
                                <p>Please wait room is creating...</p>
                            </div>
                        )}</h1>
                    </div>
                )
            }
        </div>
    )
}