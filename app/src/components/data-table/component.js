import React, {forwardRef, useState} from 'react'
import {useLocation} from "react-router-dom";
import MaterialTable from 'material-table'
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import GlobalStyle from "../../global-style";
import {StyledComboLayout, StyledDataTable} from "./style";
import Terminal from "../terminal/component";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

const safeSetTitleFromLocation = (location) => {
    if (location.state === undefined || location.state.content === undefined || location.state.content.title === undefined) {
        return "";
    }
    return location.state.content.title;
}

const safeSetColumnsFromLocation = (location) => {
    if (location.state === undefined || location.state.content === undefined || location.state.content.columns === undefined) {
        return [];
    }
    return location.state.content.columns;
}

const safeSetDataFromLocation = (location) => {
    if (location.state === undefined || location.state.content === undefined || location.state.content.data === undefined) {
        return [];
    }
    return location.state.content.data;
}

const safeSetTitleFromProps = (content) => {
    return content.title === undefined ? "" : content.title;
}

const safeSetColumnsFromProps = (content) => {
    return content.columns === undefined ? [] : content.columns;
}

const safeSetDataFromProps = (content) => {
    return content.data === [] ? [] : content.data;
}

export default function DataTable({content}) {

    const location = useLocation();

    const [title, setTitle] = useState(content === undefined ? safeSetTitleFromLocation(location) : safeSetTitleFromProps(content));
    const [columns, setColumns] = useState(content === undefined ? safeSetColumnsFromLocation(location) : safeSetColumnsFromProps(content));
    const [data, setData] = useState(content === undefined ? safeSetDataFromLocation(location) : safeSetDataFromProps(content));

    const theme = createMuiTheme({
        typography: {
            h6: {
                fontSize: 26,
                fontWeight: 'bold'
            }
        },
        overrides: {
            MuiTableSortLabel: {
                root: {
                    color: '#FFF',
                    '&:hover': {
                        color: '#D9FDFF',
                    },
                },
            },
        },
    });

    return (
        <StyledComboLayout>
            <StyledDataTable>
                <GlobalStyle terminal={true}/>
                <MuiThemeProvider theme={theme}>
                    <MaterialTable
                        icons={tableIcons}
                        title={title}
                        columns={columns}
                        data={data}
                        options={{
                            headerStyle: {
                                backgroundColor: '#01579b',
                                color: '#FFF',
                            }
                        }}
                    />
                </MuiThemeProvider>
            </StyledDataTable>
            <Terminal/>
        </StyledComboLayout>
    )
}