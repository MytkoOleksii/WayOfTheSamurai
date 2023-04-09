import React from 'react';
import {actionsCreator,} from "../../redux/dialogs-reducer.ts";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
return {
    dialogsPage: state.dialogsPage,
}
};
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(actionsCreator.sendMessageCreator(newMessageBody));
        },
     /*  updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body))
        },*/
    }
};

export default  compose(connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)
(Dialogs)

/*
compose (withAuthRedirect) (Dialogs)
let AuthRedirectComponent = withAuthRedirect(Dialogs);

/!*let AuthRedirectComponent = (props) => {
    if (!this.props.isAuth) {
        return <Navigate to={'/Login'}/>;
    }
    /!* if (this.props.isAuth == false) {return  <Navigate to={'/Login'} /> ;}*!/
    return <Dialogs {...props} />
}*!/

let DialogsContainer = connect (mapStateToProps,mapDispatchToProps) (AuthRedirectComponent);

export default DialogsContainer;*/
