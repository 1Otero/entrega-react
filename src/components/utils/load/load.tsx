const load= ({loading, setLoad}) => {
  console.log(loading)
  return <>
    <div>
     {loading?<p>Loading...</p>:<p>Finally load</p>}
     <p>refff</p>
    </div>
  </>
}

export default load