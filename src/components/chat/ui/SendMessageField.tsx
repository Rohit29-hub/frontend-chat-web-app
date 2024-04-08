import { FormEvent, useState } from 'react'
import EmojiBox from './EmojiBox';

interface Props{
    handleSendMessage: (text: string, setText: any) => void
}

const SendMessageField = ({
    handleSendMessage,
}: Props) => {
    const [text,setText] = useState<string>('');
    const sendMessage = (e: FormEvent) => {
        e.preventDefault();
        if(text?.length != 0){
            handleSendMessage(text!,setText);
        }else{
            alert('Please provide some text for sending..')
        }
    }
    return (
        <div className="flex-shrink-0 w-full h-16 bg-white py-2 px-1 md:p-4">
            <form className="w-full h-full md:flex items-center justify-center">
                <div className='relative w-full h-full flex items-center'>
                    <input type="text" value={text} onChange={(event) => setText(event.target.value.toString())} placeholder="Type your message..." className="md:w-full flex-1 px-2 py-2 mr-2 rounded-lg border-2 border-black " />
                    <div title='open emoji picker box' className='absolute right-6 top-1.5'><EmojiBox setText={setText}/></div>
                </div>
                <button title='send the message' type='submit' onClick={sendMessage} className="py-2 px-4 md:px-6 md:flex-shrink-0 rounded-md bg-[#4169fc] font-medium text-white hover:cursor-pointer">Send</button>
            </form>
        </div>
    )
}

export default SendMessageField