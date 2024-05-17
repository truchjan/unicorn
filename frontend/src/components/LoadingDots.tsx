import { ThreeDots } from "react-loader-spinner"

const LoadingDots = () => {
  return (
      <div className="flex justify-center items-center p-4">
        <ThreeDots height={40} width={40} color="purple" />
      </div>
  )
}

export default LoadingDots