import {headerLogo} from '../assets/images'
import { navLinks } from '../constants'


const Nav = () => {
 
  return (
  <header className='padding-x py-8 absolute z-10 w-full'>
     <nav className='flex justify-between items-center max-container'>
       <a href="/">
         <img 
         src={headerLogo} 
         alt="header logo"
         width={130}
         height={29}
         />
       </a>
       <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
        {navLinks.map((item)=>(
          <li key={item.label}>
            <a 
            href={item.href}
            className='leading-normal text-lg
            text-gray-400'
            >
              {item.label}
            </a>
          </li>
        ))}
       </ul>
       
      
     </nav>
  </header>
  )
}

export default Nav