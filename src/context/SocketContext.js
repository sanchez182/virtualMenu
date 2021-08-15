import {  useEffect } from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../hooks/useSocket'  
import { setSocketClient } from '../store/actions/socketClientAction';

export const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
    //TODO: sacar url de env variables
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:4002');
    const { _id } = useSelector((state) => state.restaurantData);

    const dispatch = useDispatch()
    useEffect(() => {
        if ( _id) {  
            conectarSocket();
         }  
    }, [  _id,conectarSocket ]);

  useEffect(() => {
      debugger
    if ( !_id) {  
            desconectarSocket();
        }
    }, [ _id, desconectarSocket ]);


    
    useEffect(() => {
        socket?.on('client-id', (data) => {
            debugger
            dispatch(setSocketClient(data))
            });
    }, [ socket ])

    useEffect(() => {
        socket?.on('table', (mensaje) => {
            console.log("mesa seleccionada" + " " + mensaje)
                    })
    }, [_id, socket ]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}