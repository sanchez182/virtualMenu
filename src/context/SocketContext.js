import {  useEffect } from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../actionsApi/orderActions';
import { useSocket } from '../hooks/useSocket'  
import { updateOrderClientId } from '../store/actions/ordersActions';
import { setSocketClient } from '../store/actions/socketClientAction';
import { addOrUpdateTable } from '../store/actions/tableSeleted';

export const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
    //TODO: sacar url de env variables
    const { socket, online, conectarSocket, desconectarSocket } = useSocket(process.env.REACT_APP_SOCKET_API);
    const { _id } = useSelector((state) => state.restaurantData);
    const order = useSelector((state) => state.orderData);

    const dispatch = useDispatch()
    useEffect(() => {
        if ( _id) {  
            conectarSocket();
         }  
    }, [  _id,conectarSocket ]);

  useEffect(() => {
    if ( !_id) {  
            desconectarSocket();
        }
    }, [ _id, desconectarSocket ]);


    
    useEffect(() => {
        socket?.on('create-or-update-table', (table) => {
            dispatch(addOrUpdateTable({
                selectedTable: "",
                tableList: table
            }))
        
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, socket]) 

    useEffect(() => {
        socket?.on('client-id', (data) => {
            dispatch(setSocketClient(data))
            
            debugger
            if(!localStorage.getItem("oldSocketClientId")){
                localStorage.setItem("oldSocketClientId",data)
            }

            const newOrderData = {...order}
            if(order._id){
                newOrderData.clientId = data
                updateOrder(newOrderData).then((response)=>{
                    debugger
                     dispatch(updateOrderClientId(data))
                })
            }
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, socket]) 

    useEffect(() => {
        socket?.on('table', (mensaje) => {
            console.log(`mesa seleccionada ${mensaje}`)
                    })
    }, [_id, socket ]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}