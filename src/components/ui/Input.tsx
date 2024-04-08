import { RefreshCcw } from "lucide-react"
import { useEffect, useState } from "react"
import { genrateRandomName } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { setName } from "../../redux/slices/userSlice";

const Input = () => {
  const [randomName, setRandomName] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setName(randomName))
  }, [randomName])

  return (
    <div className="w-full md:w-auto h-auto relative border-2 border-black flex rounded-md items-center justify-center overflow-hidden">
      <input onChange={(e) => {
        setRandomName(e.target.value)
      }} className="h-12 w-full lg:w-80 pl-2 font-medium focus:outline-none" value={randomName} type="text" placeholder="Enter your name" name="username" />
      <div onClick={() => setRandomName(genrateRandomName())} className="absolute right-0 h-12 cursor-pointer bg-[#4169fc] px-3 flex items-center">
        <RefreshCcw color="#fff" />
      </div>
    </div>
  )
}

export default Input