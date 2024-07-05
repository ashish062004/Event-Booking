// import React from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext.jsx';
// import { setAuthToken } from '../../api.js';

// export default function Header() {
//   const { role, setRole, isSignin, setIsSignin } = useAuth();
//   const navigate = useNavigate();

//   const handleSignOut = () => {
//     setAuthToken('');
//     setRole('user');
//     setIsSignin(false);
//     navigate('/'); // Navigate to the home page
//   };

//   return (
//     <header className="shadow sticky z-50 top-0">
//       <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
//         <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
//           <Link to="/" className="flex items-center">
//             <h2>EventBooking</h2>
//           </Link>
//           <div className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
//             <ul className="flex flex-col mt-4 font-medium text-[16px] mb-1 lg:flex-row lg:space-x-8 lg:mt-0 text-center">
//               <li>
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 ${
//                       isActive ? 'text-orange-700' : 'text-gray-700'
//                     } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/events"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 ${
//                       isActive ? 'text-orange-700' : 'text-gray-700'
//                     } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                 >
//                   Events
//                 </NavLink>
//               </li>
//               {role === 'admin' && (
//                 <li>
//                   <NavLink
//                     to="/admin/events"
//                     className={({ isActive }) =>
//                       `block py-2 pr-4 pl-3 duration-200 ${
//                         isActive ? 'text-orange-700' : 'text-gray-700'
//                       } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                     }
//                   >
//                     Create Event
//                   </NavLink>
//                 </li>
//               )}
//               <li>
//                 <NavLink
//                   to="/about"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 ${
//                       isActive ? 'text-orange-700' : 'text-gray-700'
//                     } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                 >
//                   About
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/contact"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 ${
//                       isActive ? 'text-orange-700' : 'text-gray-700'
//                     } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                 >
//                   Contact
//                 </NavLink>
//               </li>
//               {isSignin? (
//   <li>
//     <button 
//       className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out" 
//       onClick={handleSignOut}
//     >
//       Sign Out
//     </button>
//   </li>
// ) : (
//   <li>
//     <NavLink
//       to="/signup"
//       className={({ isActive }) =>
//         `block py-2 pr-4 pl-3 duration-200 ${
//           isActive? 'text-orange-700' : 'text-gray-700'
//         } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//       }
//     >
//       <button 
//         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out"
//       >
//         Sign Up
//       </button>
//     </NavLink>
//   </li>
// )}

//             </ul>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { setAuthToken } from '../../api.js';

export default function Header() {
  const { role, setRole, isSignin, setIsSignin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setAuthToken('');
    setRole('user');
    setIsSignin(false);
    navigate('/'); // Navigate to the home page
  };

  return (
    <header className="shadow-md sticky z-50 top-0 bg-white">
      <nav className="border-b border-gray-200 px-4 lg:px-6 py-0">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center text-xl font-bold text-gray-800">
            EventBooking
          </Link>
          <div className="hidden lg:flex lg:justify-center lg:items-center lg:w-auto lg:space-x-6" id="mobile-menu-2">
            <ul className="flex flex-col items-center mt-4 lg:flex-row lg:space-x-6 lg:mt-0 text-center">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-1 px-3 duration-200 ${
                      isActive ? 'text-orange-700' : 'text-gray-700'
                    } hover:text-orange-700 hover:bg-gray-50 rounded`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    `block py-1 px-3 duration-200 ${
                      isActive ? 'text-orange-700' : 'text-gray-700'
                    } hover:text-orange-700 hover:bg-gray-50 rounded`
                  }
                >
                  Events
                </NavLink>
              </li>
              {role === 'admin' && (
                <li>
                  <NavLink
                    to="/admin/events"
                    className={({ isActive }) =>
                      `block py-1 px-3 duration-200 ${
                        isActive ? 'text-orange-700' : 'text-gray-700'
                      } hover:text-orange-700 hover:bg-gray-50 rounded`
                    }
                  >
                    Create Event
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-1 px-3 duration-200 ${
                      isActive ? 'text-orange-700' : 'text-gray-700'
                    } hover:text-orange-700 hover:bg-gray-50 rounded`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-1 px-3 duration-200 ${
                      isActive ? 'text-orange-700' : 'text-gray-700'
                    } hover:text-orange-700 hover:bg-gray-50 rounded`
                  }
                >
                  Contact
                </NavLink>
              </li>
              {isSignin ? (
                <li>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded transition duration-150 ease-in-out"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      `block py-1 px-3 duration-200 ${
                        isActive ? 'text-orange-700' : 'text-gray-700'
                      } hover:text-orange-700`
                    }
                  >
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out"
                    >
                      Sign Up
                    </button>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
