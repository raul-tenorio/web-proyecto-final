import React, { useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/auth/AuthContext';

export const DashboardTemplate = () => 
{

    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const urlActual = location.pathname;
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const onLogout = async () => 
    {
        try {
            await axios.post(
                'http://web-final-backend.herokuapp.com/api/v1/logout',
                //'http://127.0.0.1:8000/api/v1/logout',
                {}, { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            navigate('/login', { replace: true });
            logout();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='md:flex md:min-h-screen'>

            <div className='md:w-1/4 bg-sky-900 px-5 py-10'>
                <h2 className='text-4xl font-black text-center text-white underline'>Prison System</h2>
                <img src={user.avatar} alt="img-client" className="m-auto mt-4" width={120} />
                <h3 className='text-2xl font-black text-center text-white'>{user.full_name}</h3>
                <h3 className='text-xl font-black text-center text-white'>{user.role}</h3>
                <hr className="mt-5 text-orange-900" />
                <ul className="mt-5 list-disc list-outside px-5">
                    <li className="text-orange-900">
                        <Link to='/update-profile' className={`${urlActual === '/update-profile' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>Actualizar perfil</Link>
                    </li>
                    <li className="text-orange-900">
                        <Link to='/directors' className={`${urlActual === '/directors' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>Listar directores</Link>
                    </li>
                    <li className="text-orange-900">
                        <Link to='/directors/create' className={`${urlActual === '/directors/create' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>Crear un director</Link>
                    </li>
                    {/* Reports */}
                    <li className="text-orange-900">
                        <Link to='/reports' className={`${urlActual === '/reports' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>Listar reportes</Link>
                    </li>
                    <li className="text-orange-900">
                        <Link to='/reports/create' className={`${urlActual === '/reports/create' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>Crear un reporte</Link>
                    </li>
                    {/* Jails */}
                    <li className="text-orange-900">
                        <Link to='/jails' className={`${urlActual === '/jails' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>Listar carceles</Link>
                    </li>
                    <li className="text-orange-900">
                        <Link to='/jails/create' className={`${urlActual === '/jails/create' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>Crear una carcel</Link>
                    </li>
                    <li className="text-orange-900">
                        <Link to='/wards' className={`${urlActual === '/wards' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>Listar pabellones</Link>
                    </li>
                    <li className="text-orange-900">
                        <Link to='/wards/create' className={`${urlActual === '/wards/create' ? 'text-blue-300 underline' : 'text-white'} text-2xl block mt-2 hover:text-blue-200`}>Crear un pabellon</Link>
                    </li>
                    <button type="button" onClick={onLogout} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Salir</button>
                </ul>
            </div>


            <div className='md:w-3/4 p-10 md:h-screen overflow-y-scroll'>
                <Outlet />
            </div>

            
        </div>
    );
}


