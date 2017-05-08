import React from 'react';
import { map, find } from 'lodash';
import {
    addGroup as restAddGroup,
    deleteGroup as restDeleteGroup,
    addMemberToGroup as restAddMemberToGroup,
    removeMemberFromGroup as restRemoveMemberFromGroup,
    getGroup as restGetGroup
} from '../../domain/rest';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';
import UserIcon from '../../icons/user-icon.png';
import Plus from '../../icons/plus.png';

const getGroup = (token, groupId) => () => {
    //TODO adapt it for groups details after it gets proper data
    restGetGroup(token, groupId).then((jsonData) => {
        console.log('GETGROUP', jsonData);
    })
};

const addGroup = (token, addToGroups) => () => {
    if(document.getElementById('new-group-name').value.trim() !== '') {
        const name = document.getElementById('new-group-name').value;
        restAddGroup(token, name).then((jsonData) => {
            addToGroups(jsonData);
        });
    }
};

const getSelectedGroupName = (groups, selectedGroup) => {
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

const addMember = (token, selectedGroup, hideModal) => () => {
    const userId = document.getElementById('input-modal-new-member-id').value;
    restAddMemberToGroup(token, selectedGroup, userId).then(() => {
        console.log('ADDED');
        hideModal();
    })
};

const removeMember = (token, selectedGroup, hideModal) => () => {
    const userId = document.getElementById('input-modal-remove-member-id').value;
    restRemoveMemberFromGroup(token, selectedGroup, userId).then(() => {
        console.log('REMOVED');
        hideModal();
    })
};

const Groups = ({user, groups, token, selectedGroup, modalAddMemberVisible, modalRemoveMemberVisible, logOut, selectGroup, addToGroups, deleteFromGroups, showAddMemberModal, hideAddMemberModal, showRemoveMemberModal, hideRemoveMemberModal}) => (
    <div>
        <div className="login__header">
            <div className="logo">
                <img className="img-medium" src={UserIcon} />
                {user.username}
            </div>
            <span className="logo-side" />
            <div className="info__logout">
                <div className="logout-container">
                    <Button className="login-button content" onClick={logOut}>Logout</Button>
                </div>
            </div>
        </div>
        <div className="logged-in-container max-height">
            <div className="form-container group-list">
                <strong className="padding-top">Your groups</strong>
                <ul>
                    {map(groups, (group) => {
                        return <li key={`${group.group_id}_${group.name}`} className="clickable" onClick={selectGroup(group.group_id)}>{group.name}</li>
                    })}
                </ul>
                <Input id="new-group-name" className="new-group-input" placeholder="New group name..." type="text" />
                <div className="plus-icon" onClick={addGroup(token, addToGroups)}/>
            </div>
            <div className="form-container groups-content">
                {selectedGroup !== undefined && (
                    <div className="group-info">
                        <div className="group-description">
                            <div>
                                {getSelectedGroupName(groups, selectedGroup)}
                            </div>
                            <div className="button-group">
                                <Button className="margin-right" onClick={() => console.log('clicked settings')}>Password settings</Button>
                                <Button className="margin-right" onClick={deleteGroup(token, selectedGroup, deleteFromGroups)}>Delete group</Button>
                            </div>
                        </div>
                        <div className="group-form">
                            <div className="group-input">
                                <span className="group-input__item">Login</span>
                                <Input className="group-input__item" type="text" />
                                <Button className="group-input__item" onClick={() => {}}>Show</Button>
                            </div>
                            <div className="group-input">
                                <span className="group-input__item">Password</span>
                                <Input className="group-input__item" type="password" disabled />
                                <Button className="group-input__item" onClick={() => {}}>Show</Button>
                            </div>
                        </div>
                        <div className="group-users">
                            <table className="users-table">
                                <thead>
                                <tr className="table-header">
                                    <th>Username</th>
                                    <th>Access</th>
                                    <th>
                                        <Button className="margin-right" onClick={showAddMemberModal}>Add member</Button>
                                        <Button onClick={showRemoveMemberModal}>Remove member</Button>
                                    </th>
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
        {modalAddMemberVisible && (
            <Modal title="Enter member id">
                <Input type="text" id="input-modal-new-member-id"/>
                <div className="modal-buttons">
                    <Button className="margin-top button-wide" onClick={addMember(token, selectedGroup, hideAddMemberModal)}>
                        Add member
                    </Button>
                    <Button className="margin-top button-wide" onClick={hideAddMemberModal}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        )}
        {modalRemoveMemberVisible && (
            <Modal title="Enter member id">
                <Input type="text" id="input-modal-remove-member-id"/>
                <div className="modal-buttons">
                    <Button className="margin-top button-wide" onClick={removeMember(token, selectedGroup, hideRemoveMemberModal)}>
                        Remove member
                    </Button>
                    <Button className="margin-top button-wide" onClick={hideRemoveMemberModal}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        )}
    </div>
);

export default Groups;