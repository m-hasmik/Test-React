import * as React from 'react'
import {Button, Collapse} from "react-bootstrap";

class CollapseV2 extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: this.props,
        };
    }

    render() {
        const { open } = this.state;
        return (
            <>
                <Button
                    onClick={() => this.setState({ open: !open })}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    click
                </Button>
                <Collapse in={this.state.open}>
                    <div id="example-collapse-text">
                        <div>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                            labore wes anderson cred nesciunt sapiente ea proident.
                        </div>
                        <div>            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                            labore wes anderson cred nesciunt sapiente ea proident.
                        </div>
                    </div>
                </Collapse>
            </>
        );
    }
}

export default CollapseV2;