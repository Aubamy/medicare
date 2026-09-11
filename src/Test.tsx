
import './App.css'
import recipes from './assets/recipes.png'

function App() {
  
  const burger = document.querySelector('#burger');
  const menu = document.querySelector('#menu');

  burger?.addEventListener('click', () => {
    if (menu?.classList.contains('hidden')) {
      menu.classList.remove('hidden');
    } else{
      menu?.classList.add('hidden');
    }
  })

  return (
    <>
     {/* <div className='p-10'>
      <h1 className='text-4xl text-purple-500 font-bold'>
        Thanks for comming,
      </h1>
      <p className='text-lg text-green-300 mt-4'>Have a Night Sleep</p>
     </div>

     <div className='p-10'>
        <div className='bg-blue-500 text-white p-5'>
          First Box
        </div>

        <div className='bg-green-500 text-white mt-10 px-8 py-4'>
          Second Box
        </div>

        <div className="w-1/2 h-20 bg-red-400">
          Box
        </div>

     </div>

     <div className="p-10">

      <div className="w-40 h-40 bg-blue-500 text-white p-4">
        Box 1
      </div>

      <div className="w-1/2 h-20 bg-green-500 text-white p-4 mt-5">
        50% Width
      </div>

      <div className="w-full h-20 bg-red-500 text-white p-4 mt-5">
        Full Width
      </div>

    </div> */}

    
{/* 
<div className="bg-red-500 h-40 w-1/2 mt-4 border-b border-gray-500">
      <h1 className="text-4xl text-white font-bold">Welcome to My Website</h1>
      <h4 className="fond-blod uppercase text-2xl text-blue-300">Sharp</h4>
      <p className='p-4'>Let's Go</p>
      <p className="px-16 py-6">Move</p>
      <h4 className="mt-1 text-4xl text-green-300">Margin</h4>
</div> */}
<div className='grid md:grid-cols-3'>
  <div className='md:col-span-1 md:flex md:justify-end'>
                    <nav className='text-right'>
                        <div className='flex justify-between items-center'>
                            <h1 className="font-bold uppercase p-4 border-b border-gray-100">
                                <a href="/" className="hover:text-gray-700">Food Ninja</a>
                            </h1>
                            <div className="px-4 cursor-pointer md:hidden" id='burger'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

                            </div>
                        </div>
                        <ul className='text-sm mt-6 hidden md:block' id='menu'>
                            <li className="text-gray-700 font-bold py-1">
                                <a href="#" className='px-4 flex justify-end border-r-4 border-red-300'>
                                    <span>Home</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 ml-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

                                </a>
                            </li>
                            <li className='py-1'>
                                <a href="#" className='px-4 flex justify-end border-r-4 border-white'>
                                    <span>About</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 ml-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
</svg>

                                </a>
                            </li>
                            <li className='py-1'>
                                <a href="#" className='px-4 flex justify-end border-r-4 border-white'>
                                    <span>Contact</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 ml-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>

                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

<main className="px-16 py-6 bg-gray-100 md:col-span-2">
  <div className="flex justify-center md:justify-end">
  <a href="#" className='text-red-300 rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointet tracking-wider border-red-300 md:border-2 hover:bg-red-300 hover:text-white transition ease-out duration-500'>Log in</a>
  <a href="#" className='text-red-300 ml-2 rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointet tracking-wider border-red-300 md:border-2 hover:bg-red-300 hover:text-white transition ease-out duration-500'>Sign up</a>
</div>

<header>
  <h2 className='text-gry-700 text-6xl font-semibold'>Recipes</h2>
  <h2 className='text-2xl font-semibold'>For Ninja</h2>
</header>

<div>
  <h4 className='font-bold mt-12 pb-2 border-b border-gray-200'>Latest Recipes</h4>

  <div className="mt-8 grid lg:grid-cols-3 gap-10">

    <div className='bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg'>
      <img src={recipes} alt="" className='w-full h-32 sm:h-48 object-cover'/>
      <div className='m-4'>
        <span className='font-bold'>5 Bean Chill Stew</span>
        <span className='block text-gray-500 text-sm'>Recipe by Mario</span>
      </div>
      <div className='bg-gray-500 text-white text-xs uppercase rounded-full p-2 absolute top-0 ml-2 mt-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" w-5 inline-block">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        <span className=''>25 mins</span>
      </div>
    </div>
    <div className='bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg'>
      <img src={recipes} alt="" className='w-full h-32 sm:h-48 object-cover'/>
      <div className='m-4'>
        <span className='font-bold'>Veg Noodles</span>
        <span className='block text-gray-500 text-sm'>Recipe by Mario</span>
      </div>
      <div className='bg-gray-500 text-white text-xs uppercase rounded-full p-2 absolute top-0 ml-2 mt-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" w-5 inline-block">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        <span className=''>25 mins</span>
      </div>
    </div>
    <div className='bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg'>
      <img src={recipes} alt="" className='w-full h-32 sm:h-48 object-cover'/>
      <div className='m-4'>
        <span className='font-bold'>Curry Rice</span>
        <span className='block text-gray-500 text-sm'>Recipe by Mario</span>
      </div>
      <div className='bg-gray-500 text-white text-xs uppercase rounded-full p-2 absolute top-0 ml-2 mt-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" w-5 inline-block">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        <span className=''>25 mins</span>
      </div>
    </div>
  </div>
</div>

{/* <div className="flex items-center justify-center">
  <div className="bg-green-500 h-4 w-6"></div>
  <div className="bg-red-500 h-8 w-6"></div>
  <div className="bg-blue-500 h-12 w-6"></div>
</div> */}

<div className="flex justify-center">
  <div className="bg-gray-500 text-white rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointet tracking-wider hover:shadow-inner transform hover:scale-125 hover:bg-opacity-50 transition ease-out duration-300">Load More</div>
</div>
<div className="bg-red-500 h-10 w-12 sm:bg-blue-500 md:bg-green-500 xl:bg-purple-500"></div>
</main>

</div>
    </>
  )
}

export default App
