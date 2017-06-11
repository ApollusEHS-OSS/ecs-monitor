import React, { Component, PropTypes } from 'react';
import { nameFromAwsArn } from '../../../../utils/stringFormatting';
import './agent.css';

/**
 * IDEAS:
 * - Add a tooltip on hover to display more info about the task
 */

class Agent extends Component {
    getColour(taskDefinitionArn) {
        return this.props.taskDefinitionColours[taskDefinitionArn];
    }
    
    renderTaskListEntry(task) {
        const style = {
            backgroundColor: this.getColour(task.taskDefinitionArn)
        };
        return (
            <li className="task card-panel" key={task.taskArn} style={style}>
                <i className={`status-icon ${task.lastStatus.toLowerCase()}`}></i>
                <p className="task-definition">{nameFromAwsArn(task.taskDefinitionArn)}</p>
            </li>
        );
    }
    
    render() {
        const details = this.props.agentDetails;
        const taskListItems = details.tasks.map(this.renderTaskListEntry, this);
        return (
            <div className="agent col">
                <div>
                    <i className="small material-icons">perm_identity</i>
                    <strong>{details.instance.ec2InstanceId}</strong>
                </div>
                <p>{details.tasks.length} tasks</p>
                <hr />
                <ul>
                    {taskListItems}
                </ul>
            </div>
        );
    }
}

Agent.propTypes = {
    agentDetails: PropTypes.object.isRequired,
    taskDefinitionColours: PropTypes.object.isRequired
};

export default Agent;