interface Props{
    image_url: string,
    alt_title?: string,
}

const Logo = ({image_url, alt_title}: Props) => {

  return (
    <div className="w-auto h-auto flex items-center justify-center mb-4">
        <img className="welcome-screen-logo w-[30rem] lg:w-[50rem] h-auto" src={image_url} alt={alt_title || "Loading..."} />
    </div>
  )
}

export default Logo