import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Listing from '../../components/Navigation/Listing/Listing';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Toolbar />
                <Listing />
            </Aux>
        );
    }

}

export default Layout;