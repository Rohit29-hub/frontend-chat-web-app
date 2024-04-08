import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { setActiveUsers, setConnectedUserInfo, setSenderSocket } from '../redux/slices/userSlice';
import { addMessage } from '../redux/slices/chatSlice';

type SocketInstance = Socket | null;

export const useSocket = () => {
    const {name} = useSelector((slices: any) => slices.user);
    const dispatch = useDispatch();
    const [socket, setSocket] = useState<SocketInstance>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [isErrorModelOpen, setIsErrorModelOpen] = useState<boolean>(false);
    const [mySocketID, setMySocketID] = useState<string>("");
    const [isRequestModelOpen, setIsRequestModelOpen] = useState<boolean>(false);
    const [reqLoadingForChatConnection, setReqLoadingForChatConnection] = useState<boolean>(false);


    const [resMessageFromChatConnection, setResMessageFromChatConnection] = useState<any>({
        message: "",
        success: false
    });

    useEffect(() => {
        const socketClient = io('http://192.168.0.103:3000');

        const handleNewConnection = (connection: any) => {
            dispatch(setActiveUsers(connection))
        };

        const handleRequestForChat = (senderSocketInfo: any) => {
            dispatch(setSenderSocket(senderSocketInfo[0]));
            setIsOpen(true);
        };

        const handleResponseFromReceiverDenyReq = (reasonToDenyRequest: any) => {
            setResMessageFromChatConnection(reasonToDenyRequest);
            setReqLoadingForChatConnection(false);
        };

        const handleSomethingIsWrong = ({ message }: { message: any }) => {
            setError(message);
            setIsErrorModelOpen(true);
        };

        const handleUserStatus = ({ message }: { message: any }) => {
            if (message == "User Disconnected" || message == "You have been disconnected") {
                dispatch(setSenderSocket({}));
                dispatch(setConnectedUserInfo({}));
            }
            setIsRequestModelOpen(false);
            setError(message);
            setIsErrorModelOpen(true);
        };

        const handleResponseFromReceiverAcceptReq = (reasonToAcceptRequest: any) => {
            dispatch(setConnectedUserInfo(reasonToAcceptRequest.data[0]));
            setResMessageFromChatConnection(reasonToAcceptRequest);
            setReqLoadingForChatConnection(false);
        };

        const handleMessageFromPairingSocket = (payload: any) => {
            dispatch(addMessage(payload));
        };

        socketClient.on('connect', () => {
            setSocket(socketClient);
            setMySocketID((String)(socketClient.id));
            socketClient.emit('socket_name',name);
            socketClient.on('new_connection', handleNewConnection);
            socketClient.on('request_for_chat', handleRequestForChat);
            socketClient.on('response_from_reciver_deny_req', handleResponseFromReceiverDenyReq);
            socketClient.on('something_is_wrong', handleSomethingIsWrong);
            socketClient.on('user_status', handleUserStatus);
            socketClient.on('response_from_reciver_accept_req', handleResponseFromReceiverAcceptReq);
            socketClient.on('message_from_pairing_socket', handleMessageFromPairingSocket);
        });

        socketClient.on('disconnect', () => {
            console.log('Disconnected from Socket!');
            setSocket(null);
            dispatch(setSenderSocket({}));
            dispatch(setConnectedUserInfo({}));
        });

        return () => {
            if (socketClient) {
                socketClient.disconnect();
            }
        };
    }, []);

    const handleRequest = (socketId: string) => {
        socket?.emit('do_request_to_socket', socketId);
        setIsRequestModelOpen(true);
        setReqLoadingForChatConnection(true);
    }

    const handleSendMessage = (text: string, setText: any) => {
        dispatch(addMessage({
            id: mySocketID,
            message: text,
            time: Date.now(),
        }));

        socket?.emit('message_from_pairing_socket', {
            message: text
        });

        setText("");
    }



    return {handleSendMessage,handleRequest,socket,mySocketID, isOpen,error,isErrorModelOpen,isRequestModelOpen,reqLoadingForChatConnection,resMessageFromChatConnection,setIsErrorModelOpen,setIsRequestModelOpen,setIsOpen,setResMessageFromChatConnection}
}

