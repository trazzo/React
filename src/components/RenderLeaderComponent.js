import React from 'react';
import { Media } from 'reactstrap';

const RenderLeader = (props) => {
    return (
        <div>
            <Media tag="li">
                <Media left>
                    <Media object src={props.leader.image} alt={props.leader.name} />
                </Media>
                <Media body>
                    <Media heading>
                        {props.leader.name}
                    </Media>
                    {props.leader.designation}
                    <br></br>
                    {props.leader.description}
                </Media>
            </Media>
        </div>
    ); 
}

export default RenderLeader;