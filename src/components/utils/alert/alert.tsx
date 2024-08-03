function AlertGlobal({infoAlert, setAlertGlobal}:{infoAlert:{status: Boolean, message: String, type: String}, setAlertGlobal:Function}){
  setTimeout(() => {
   setAlertGlobal({status: false, message: '', type: 'red'})
  }, 2300)  
  return <>
    {infoAlert.status?<header className="flex flex-wrap justify-center items-center">
        <div className={`bg-${infoAlert.type}-500 p-2 text-lg text-white w-full`}>
            <div>
            <h2>{infoAlert.message}</h2>
            </div>
        </div>
    </header>:<div></div>}
  </>
}
export default AlertGlobal