import {  useEffect } from 'react';
import { createContext } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../hooks/useSocket'  

export const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
    //TODO: sacar url de env variables
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:4002');
    const { _id } = useSelector((state) => state.restaurantData);

    useEffect(() => {
        if ( _id) {  
            console.log("Se vuelve a vonectar")
            conectarSocket();
         }  
    }, [  _id,conectarSocket ]);

  useEffect(() => {
    if ( !_id) {  
            desconectarSocket();
        }
    }, [ _id, desconectarSocket ]);

    useEffect(() => {
        socket?.on('table', (mensaje) => {
            debugger
            console.log("mesa seleccionada" + " " + mensaje)
                    })
    }, [_id, socket ]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}