import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SenderModel } from "../components/modals/SenderModel";
import { ReciverModel } from "../components/modals/ReciverModel";
import { ErrorModel } from "../components/modals/ErrorModel";
import { useSocket } from "../socket/socketLogic";
import ChatBox from "../components/chat/ChatBox";
import LoadingModel from "../components/modals/LoadingModel";


const ChatScreen = () => {
    const {
        handleSendMessage,
        handleRequest,
        socket,
        mySocketID,
        isOpen,
        error,
        isErrorModelOpen,
        isRequestModelOpen,
        reqLoadingForChatConnection,
        resMessageFromChatConnection,
        setIsErrorModelOpen,
        setIsRequestModelOpen,
        setIsOpen,
        setResMessageFromChatConnection,
    } = useSocket();

    const { name, senderSocket, } = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!name) {
            navigate('/');
        }
    }, []);

    return (
        socket ? (
            <>
                <ReciverModel setResMessageFromChatConnection={setResMessageFromChatConnection} setIsRequestModelOpen={setIsRequestModelOpen} resMessageFromChatConnection={resMessageFromChatConnection} reqLoadingForChatConnection={reqLoadingForChatConnection} isRequestModelOpen={isRequestModelOpen} />
                <SenderModel isOpen={isOpen} setIsOpen={setIsOpen} socket={socket} senderSocket={senderSocket} />
                <ErrorModel isErrorModelOpen={isErrorModelOpen} error={error} setIsErrorModelOpen={setIsErrorModelOpen} />
                <ChatBox socket={socket} handleSendMessage={handleSendMessage} handleRequest={handleRequest} mySocketID={mySocketID}/>
            </>
        ) : <LoadingModel/>
    )
}

export default ChatScreen