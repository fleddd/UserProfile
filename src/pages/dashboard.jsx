import { motion } from "framer-motion"
import LoadingSpinner from "../components/loadingSpinner"
import useFirestore from "../hooks/useFirestore"

const Dashboard = () => {
  const { users, isLoading } = useFirestore()

  // const workers = users.reduce((total, currentUsers) => currentUsers.role === 'Worker' ? total + 1 : total, 0)
  // const managers = users.reduce((total, currentUsers) => currentUsers.role === 'Manager' ? total + 1 : total, 0)
  // const ceo = users.reduce((total, currentUsers) => currentUsers.role === 'C-Level' ? total + 1 : total, 0)
  // const staffs = users.reduce((total, currentUsers) => currentUsers.role === 'Staff' ? total + 1 : total, 0)

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <motion.main
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
          },
        }}
        className="flex  flex-col h-full items-center justify-center"
      >
        <div className="text-center grid xs:grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <div className="w-[400px] h-[150px] border-2 border-blue-500 bg-blue-400 rounded-xl text-white">
            <div className="flex gap-3 justify-center items-center h-full">
              <div className="flex gap-3">
                <p className="text-4xl">Total users: {users.length}</p>
              </div>
            </div>
          </div>
          <div className="w-[400px] h-[150px] border-2 border-yellow-500 bg-yellow-400 rounded-xl text-white">
            <div className="flex gap-3 justify-center items-center h-full">
              <div className={"grid grid-cols-2 items-start gap-10 text-3xl"}>
                <span className="text-xl">Workers: </span>
                <span className="text-xl">Managers: </span>
                <span className="text-xl">C-Levels: </span>
                <span className="text-xl">Staff: </span>
              </div>
            </div>
          </div>
          <div className="w-[400px] h-[150px] border-2 border-green-500 bg-green-400 rounded-xl text-white">
            <div className="flex gap-3 justify-center items-center h-full">
              <div className="flex gap-3">
                <p className="text-4xl">Total users: {users.length}</p>
              </div>
            </div>
          </div>
          <div className="w-[400px] h-[150px] border-2 border-purple-500 bg-purple-400 rounded-xl text-white">
            <div className="flex gap-3 justify-center items-center h-full">
              <div className="flex gap-3">
                <p className="text-4xl">Total users: {users.length}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </>
  )
}

export default Dashboard
