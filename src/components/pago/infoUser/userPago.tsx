import infoUser from "../../../model/pago/infoUser/userPago"
import Select from 'react-select'

function userPago({user, setUser, urlPdfAccept, setIsAccepted, isAccepted}:{user:infoUser, setUser:Function, urlPdfAccept:String, setIsAccepted:Function,isAccepted:Boolean}){
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
      const {name, value}= event.target
      setUser((prev: any) => {
        return {...prev, [name]: value}})
    }
    const listDocument= [{
      value: "TI",
      label: "TI"   
    },{
      value: "CC",
      label: "CC"   
    }]
    function changeTypeDoc(e: any){
        const valueType= e.value
        setUser((prev: any) => {
          return {...prev, legal_id_type: valueType}
        })
    }
    return <>
      <div>
        <form className="flex flex-wrap justify-center">
            <input 
             type="text" 
             name="full_name"
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             value={user.full_name as string}
             placeholder="name"
             onChange={handleInputChange}
            />
            {/* <input 
             type="text" 
             name="legal_id_type"
             placeholder="type document"
             value={user.legal_id_type as string}
             onChange={handleInputChange}
             /> */}
            <Select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"type document"} options={listDocument} onChange={changeTypeDoc}/>
            <input 
             type="number" 
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             name="legal_id"
             placeholder="num document"
             value={user.legal_id as string}
             onChange={handleInputChange}
             />
            <input 
             type="number"
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             name="phone_number"
             placeholder="phone number"
             value={user.phone_number as string}
             onChange={handleInputChange}
             />
            <div className="flex flex-wrap justify-center m-2">
             <div className="m-2">
              <a href={urlPdfAccept as string} target="_blank">ver terminos</a>
             </div>
             <div className="m-2">
              <input type="checkbox" checked={isAccepted as boolean} onChange={() => setIsAccepted(!isAccepted)}/>
             </div>
            </div>
        </form>
      </div>
    </>
}
export default userPago