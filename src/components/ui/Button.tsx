interface Props{
    btn_title: string,
    handlefunction: () => void,
}


const Button = ({btn_title,handlefunction}: Props) => {
  return (
    <div className="w-full md:w-auto h-auto">
        <button className={`w-full md:w-auto py-3 px-4 rounded-md bg-[#4169fc] font-medium text-white hover:cursor-pointer outline outline-2 outline-black outline-offset-2`} onClick={() => handlefunction()}>
            {btn_title}
        </button>
    </div>
  )
}

export default Button