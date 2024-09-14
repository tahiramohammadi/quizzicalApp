function Quiz(props) {
    return (
      <>
           <div className="relative h-screen">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40  rounded-bl-full bg-lightyellow absolute top-0 right-0">
            </div>
                  <div className="flex  text-indigo-900 font-bold items-center absolute inset-0 justify-center flex-col">
                  <h1 className="  leading-normal text-3xl">Quizzical</h1>
                  <p>Test your knowledges here</p>
                  <button className="bg-indigo-900 text-white p-4 rounded-full w-48 m-4" onClick={props.handleClick}>start quiz</button>
                  </div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40  rounded-tr-full  bg-lightblue absolute bottom-0 left-0">
            </div>
           </div>
      </>
    )
  }
  
  export default Quiz