import { SmilePlus } from "lucide-react"
import { useState } from "react";

const emojis = [

    { emoji: "😊", name: "Happy" },
    { emoji: "😂", name: "Face with Tears of Joy" },
    { emoji: "😍", name: "Smiling Face with Heart-Eyes" },
    { emoji: "🙏", name: "Folded Hands" },
    { emoji: "❤️", name: "Red Heart" },
    { emoji: "😭", name: "Loudly Crying Face" },
    { emoji: "🤔", name: "Thinking face" },
    { emoji: "😎", name: "Smiling Face with Sunglasses" },
    { emoji: "🤣", name: "Rolling on the Floor Laughing" },
    { emoji: "😅", name: "Grinning Face with Sweat" },
    { emoji: "😊", name: "Winking Face" },
    { emoji: "🎉", name: "Party Popper" },

]

const EmojiBox = ({setText}:{setText: any}) => {
    const [isEmojiBoxOpen, setIsEmojiBoxOpen] = useState(false);

    function handleEmojiBox(){
        setIsEmojiBoxOpen(!isEmojiBoxOpen);
    }

    function handleEmojiSet(emoji: string){
        setText((text: string) => text + emoji);
    }

  return (
    <div className="relative">
        <div className={`${isEmojiBoxOpen ? 'grid' : 'hidden'} absolute shadow-lg -top-[9rem] -left-[2rem] w-28 h-32 bg-[#495057] place-items-center rounded-lg grid-cols-3 gap-none `}>
            {
                emojis.map(({emoji,name},index) => (
                    <span className="col-span-1 cursor-pointer hover:shadow-xl hover:shadow-gray-600" key={index} onClick={() => {
                        handleEmojiSet(emoji);
                    }} title={name}>{emoji}</span>
                ))
            }
        </div>
        <button type="button" onClick={handleEmojiBox}>
            <SmilePlus/>
        </button>
    </div>
  )
}

export default EmojiBox