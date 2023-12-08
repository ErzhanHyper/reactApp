import {
    Box,
    Button,
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Typography
} from "@mui/material";
import TopicIcon from '@mui/icons-material/Topic';
import TaxIcon from '@mui/icons-material/TrendingUp';
import CalculateIcon from '@mui/icons-material/Calculate';
import PaymentIcon from '@mui/icons-material/Payment';
import FactoryIcon from '@mui/icons-material/Factory'
import WaterIcon from '@mui/icons-material/WaterDrop'
import CO2Icon from '@mui/icons-material/CO2'
import MapIcon from '@mui/icons-material/Map'

import {Link} from 'react-router-dom';
import {getUser} from "../actions/auth";
import {useEffect, useState} from "react";


const list = [

    {
        name: 'Калькуляторы',
        path: '/list1',
        icon: <CalculateIcon/>,
        access: ['ROLE_ADMIN', 'ROLE_USER'],
        show: true,
        nested: [
            {
                name: 'Расчет сброса',
                path: '/wastewater',
                icon: <WaterIcon/>,
                access: ['ROLE_ADMIN', 'ROLE_USER'],
                show: true,
            },
            {
                name: 'Расчет выброса',
                path: '/emissions',
                icon: <FactoryIcon/>,
                access: ['ROLE_ADMIN', 'ROLE_USER'],
                show: true,
            },
        ]
    },

    {
        name: 'Справочники',
        path: '/list2',
        icon: <TopicIcon/>,
        access: ['ROLE_ADMIN', 'ROLE_USER'],
        show: false,
        nested: [
            {
                name: 'Загрязняющее вещество',
                path: '/pollutant',
                icon: <CO2Icon/>,
                access: ['ROLE_ADMIN', 'ROLE_USER'],
                show: true,
            },

            {
                name: 'Ставки платы',
                path: '/pollutant/chargeRate',
                icon: <TaxIcon/>,
                access: ['ROLE_ADMIN', 'ROLE_USER'],
                show: true,
            },

            {
                name: 'Регионы',
                path: '/region',
                icon: <MapIcon/>,
                access: ['ROLE_ADMIN'],
                show: false,
            },

            {
                name: 'МРП',
                path: '/mrp',
                icon: <PaymentIcon/>,
                access: ['ROLE_ADMIN'],
                show: false,
            },
        ]
    },

    // {
    //     name: 'Пользователи',
    //     path: '/user',
    //     icon: <PeopleIcon />
    // },
]


export default function MainMenuItems() {


    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const listItems = list.map((el, i) =>
        <Box key={i}>{el.show && (
            <div>
                <List key={i} component="nav" aria-label="main mailbox folders" dense={true}>
                    <ListItem key={i}>
                        <Typography variant='h6'>{el.name}</Typography>
                    </ListItem>
                </List>
            </div>
        )}
            {el.show && el.nested && el.nested.map((item, j) =>
                <div>
                    {item.show &&
                    <Collapse timeout="auto" unmountOnExit key={j} in={true}>
                        <List component="div" disablePadding dense={true}>
                            <ListItemButton component={Link} to={item.path} sx={{pl: 4}}
                                            selected={(selectedIndex === item.path)}
                                            onClick={(event) => handleListItemClick(event, item.path)}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name}/>
                            </ListItemButton>
                        </List>
                    </Collapse>}
                </div>
            )}
        < /Box>
    )

    const [roles, setRoles] = useState([]);
    const [items, setItems] = useState(list);

    const checkUser = () => {
        getUser().then(res => {
            if (res.roles) {
                setRoles(res.roles)
                accessMenu(res.roles)
            }
        })
    }

    const accessMenu = (arr) => {
        const nextItems = items.filter(el => {
            el.access.map(access => {
                if (arr.indexOf(access) >= 0) {
                    el.show = true
                    return el
                }
            })

            el.nested.filter(nest => {
                nest.access.map(access => {
                    if (arr.indexOf(access) >= 0) {
                        nest.show = true
                        return nest
                    }
                })
            })

        })

        setItems(nextItems)
    }

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <div key={4}>
            {listItems}
        </div>
    )
}
