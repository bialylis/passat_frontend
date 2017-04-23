import React from 'react';
import { map, find } from 'lodash';
import { addGroup as restAddGroup, deleteGroup as restDeleteGroup } from '../../domain/rest';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

const addGroup = (token, addToGroups) => () => {
    if(document.getElementById('new-group-name').value !== '') {
        const name = document.getElementById('new-group-name').value;
        restAddGroup(token, name).then((jsonData) => {
            addToGroups(jsonData);
        });
    }
};

const getSelectedGroupName = (groups, selectedGroup) => () => {
    const selectedGroupData = find(groups, (group) => group.group_id === selectedGroup);
    if(selectedGroupData){
        return selectedGroupData.name || '';
    } else {
        return '';
    }
};

const deleteGroup = (token, selectedGroup, deleteFromGroups) => () => {
    restDeleteGroup(token, selectedGroup).then(() => {
        deleteFromGroups(selectedGroup);
    })
};

const Groups = ({user, groups, token, selectedGroup, modalVisible, logOut, selectGroup, addToGroups, deleteFromGroups, showModal, hideModal}) => (
    <div>
        <div className="login__header">
            pass@
            <div className="info__logout">
                <div className="logout-container">
                    {user.username}
                    <Button className="login-button content" onClick={logOut}>Logout</Button>
                </div>
            </div>
        </div>
        <div className="logged-in-container max-height">
            <div className="form-container group-list">
                <strong>Your groups</strong>
                <ul>
                    {map(groups, (group) => {
                        return <li key={`${group.group_id}_${group.name}`} className="clickable" onClick={selectGroup(group.group_id)}>{group.name}</li>
                    })}
                </ul>
                <input id="new-group-name" className="new-group-input" placeholder="New group name..." type="text" />
                <Button className="add-group-button" onClick={addGroup(token, addToGroups)}>
                    +
                </Button>
            </div>
            <div className="form-container groups-content">
                {selectedGroup !== undefined && (
                    <div className="group-info">
                        <div className="group-description">
                            <div>
                                {getSelectedGroupName(groups, selectedGroup)}
                            </div>
                            <div className="button-group">
                                <Button className="margin-right" onClick={showModal}>Password settings</Button>
                                <Button className="margin-right" onClick={deleteGroup(token, selectedGroup, deleteFromGroups)}>Delete group</Button>
                            </div>
                        </div>
                        <div className="group-form">
                            <div className="group-input">
                                <span className="group-input__item">Login</span>
                                <input className="group-input__item" type="text" />
                                <Button className="group-input__item">Show</Button>
                            </div>
                            <div className="group-input">
                                <span className="group-input__item">Password</span>
                                <input className="group-input__item" type="password" />
                                <Button className="group-input__item">Show</Button>
                            </div>
                        </div>
                        <div className="group-users">
                            <table className="users-table">
                                <thead>
                                <tr className="table-header">
                                    <th>Username</th>
                                    <th>Access</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>user1</td>
                                    <td>Admin</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>user2</td>
                                    <td>Full access</td>
                                    <td><Button>X</Button></td>
                                </tr>
                                <tr>
                                    <td>user3</td>
                                    <td>Blocked</td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
        {modalVisible && (
            <Modal title="Enter your password">
                <Input type="password" id="input-modal-password"/>
                <div className="modal-buttons">
                    <Button className="margin-top button-wide" onClick={() => {console.log('accepted');}}>
                        Accept
                    </Button>
                    <Button className="margin-top button-wide" onClick={hideModal}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        )}
    </div>
);

export default Groups;