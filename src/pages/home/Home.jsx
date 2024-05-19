import { useNavigate } from "react-router"
import { Button, Image } from "../../components"
import { motion } from "framer-motion"

const Home = () => {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
        },
      }}
      className="w-full h-full flex justify-center px-5 items-center flex-col gap-[200px] py-24"
    >
      <div className="flex justify-center items-center gap-3">
        <div className="flex flex-col gap-12">
          <div className="space-y-2">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl md:text-4xl font-bold dark:text-white w-10/12">
                The simpliest CRM for your team!
              </h2>
            </div>
            <div>
              <p className="w-9/12 dark:text-white ">
                Organization of employee database, control of team performance —
                all in one{" "}
                <span className="border-b-[1px] border-blue-500 text-blue-400 font-bold">
                  CRM system.
                </span>
              </p>
            </div>
          </div>

          <div>
            <Button
              text={"Check out for free!"}
              onClick={() => navigate("/UserProfile/auth")}
            />
          </div>
        </div>

        <div>
          <Image.Accept size={150} />
          <Image.Cancel size={150} />
        </div>
      </div>

      <div className=" flex justify-center items-center gap-6 flex-col">
        <div className="flex gap-12 items-center">
          <div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl md:text-4xl font-bold dark:text-white w-10/12">
                Control all your team.
              </h3>
            </div>
            <div>
              <p className="w-9/12 dark:text-white ">
                You can add, delete, edit employees and put all nesseccary{" "}
                <span className="border-b-[1px] border-black dark:border-blue-400 font-bold text-blue-400 ">
                  data.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <Image.Homepage2 />
          <Image.Homepage1 />
        </div>
      </div>
    </motion.div>
  )
}

export default Home
