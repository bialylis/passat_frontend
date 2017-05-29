import React from 'react';
import { map, find, uniqBy } from 'lodash';
import {
    addGroup as restAddGroup,
    deleteGroup as restDeleteGroup,
    addMemberToGroup as restAddMemberToGroup,
    removeMemberFromGroup as restRemoveMemberFromGroup,
    getGroup as restGetGroup,
    getUserPublicKey as restGetUserPublicKey,
    addGroupPasswordForUser as restAddGroupPasswordForUser,
    generateKeys as restGenerateKeys,
    getGroupPasswords as restGetGroupPasswords
} from '../../domain/rest';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';
import UserIcon from '../../icons/user-icon.png';

const decryptPass = (pickedPassToShow, addDecryptedPassToStore, hidePasswordModal) => () => {
    const privateKeyPassword = document.getElementById('input-modal-decode-password').value;
    //TODO decrypt private Key
    //TODO decrypt hashed Pass with private key
    const decryptedPass = 'dfgdsf93[5asf][';
    addDecryptedPassToStore(pickedPassToShow, decryptedPass);
    hidePasswordModal();
};

const getGroup = (selectGroup, setGroupData, token, groupId) => () => {
    restGetGroup(token, groupId).then((jsonData) => {
        setGroupData(jsonData);
        selectGroup(groupId)();
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

const generateKeys = (token, logOut, error) => () => {
    const encription_pass = document.getElementById('private-key-password').value;
    restGenerateKeys(token, encription_pass).then((response) => {
        if(response.status === 400) {
            error('Could not generate keys');
        } else {
            error('Keys were generated');
            logOut();
        }
    })
};

const getGroupPasswords = (token, setGroupPasswords, selectedGroup, error) => {
    restGetGroupPasswords(token, selectedGroup).then(jsonData => {
        if(jsonData.status === 400) {
            console.log('error during fetching passes');
            error('Could not get passwords');
        } else {
            console.log('passwords');
            error('Fetched passwords for group');
            setGroupPasswords([
                {name: 'Jira', login: 'jiracomp', pass: 'asdf234dgsa'},
                {name: 'Facebook', login: 'fblogin', pass: 'asdf234dgsa'},
                {name: 'Gmail', login: 'maillogin', pass: 'asdf234dgsa'},
            ]);
        }
    })
};

const deleteGroup = (token, logout, error) => () => {
    restDeleteGroup(token, selectedGroup).then(() => {
        deleteFromGroups(selectedGroup);
    })
};

const addMember = (token, selectedGroup, hideModal, error, setGroupData) => () => {
    const userEmail = document.getElementById('input-modal-new-member-id').value;
    restAddMemberToGroup(token, selectedGroup, userEmail).then((response) => {
        if(response.status === 400) {
            error('Could not invite user');
        } else {
            error('Added member to group');
            restGetGroup(token, selectedGroup).then((jsonData) => {
                setGroupData(jsonData);
            });
        }
        hideModal();
    })
};

const removeMember = (token, selectedGroup, hideModal, userId, error, setGroupData) => () => {
    console.log(userId);
    //const userId = document.getElementById('input-modal-remove-member-id').value;
    restRemoveMemberFromGroup(token, selectedGroup, userId).then((response) => {
        if(response.status === 401) {
            error('You don not have permission to remove other users');
        } else {
            restGetGroup(token, selectedGroup).then((jsonData) => {
                setGroupData(jsonData);
            });
        }
        hideModal();

    })
};

const addPasswordForGroup = (token, groupData, groupId, user, error) => {
    const name = document.getElementById('add-pass-name').value;
    const login = document.getElementById('add-pass-login').value;
    const pass = document.getElementById('add-pass-pass').value;
    const note = document.getElementById('add-pass-desc').value;
    const userKeys = [];
    groupData.userList.forEach(u => {
        restGetUserPublicKey(token, u.user_id).then((jsonData => {

            console.log(jsonData)

            if(jsonData.status === 400) {
                error('Cannot find user public key');
            } else {
                restAddGroupPasswordForUser(token, groupId, groupData, user, name, login, pass, note).then(response => {
                    if(response.status === 400) {
                        error('Could not add password');
                    } else {
                        error('Added password');
                    }
                });
            }
        }))
    });
};

const Groups = ({addDecryptedPassToStore, pickedPassToShow, encodedGroupPasswords = [], modalShowPasswordVisible, showPasswordModal, hidePasswordModal, setGroupData, toBeRemovedId, groupData, info, error, groupFlow, user, groups, token, selectedGroup, modalAddMemberVisible, modalRemoveMemberVisible, logOut, selectGroup, addToGroups, deleteFromGroups, showAddMemberModal, hideAddMemberModal, showRemoveMemberModal, hideRemoveMemberModal, addGroupPassword, switchToMainGroupPanel, groupSettings, groupPasswords, setGroupPasswords}) => (
    <div>
        {console.log(encodedGroupPasswords)}
        <div className="login__header">
            <div className="logo">
                <img className="img-medium" src={UserIcon} />
                {user.username}
            </div>
            <span className="logo-side" />
            <span className="font24">{info}</span>
            <div className="info__logout">
                <div className="logout-container">
                    <Button className="login-button content" onClick={logOut}>Logout</Button>
                </div>
            </div>
        </div>
        <div className="logged-in-container max-height">
            <div className="form-container group-list">
                <strong className="padding-top your-groups">Your groups</strong>
                <ul>
                    {map(groups, (group) => {
                        return <li key={`${group.group_id}_${group.name}`} className={group.group_id === selectedGroup ? "clickable group-list-ele bold" : "clickable group-list-ele"} onClick={getGroup(selectGroup, setGroupData, token, group.group_id)}>{group.name}</li>
                    })}
                </ul>
                <Input id="new-group-name" className="new-group-input" placeholder="New group name..." type="text" />
                <div className="plus-icon" onClick={addGroup(token, addToGroups)}/>
            </div>
            <div className="form-container groups-content">
                {user.public_key === null && <Modal title="Enter your new private key password.">
                    <Input type="password" id="private-key-password"/>
                    <div className="modal-buttons">
                        <Button className="margin-top button-wide" onClick={generateKeys(token, logOut, error)}>
                            Set password
                        </Button>
                        <Button className="margin-top button-wide" onClick={hidePasswordModal}>
                            Cancel
                        </Button>
                    </div>
                </Modal>}
                {selectedGroup !== undefined && user.public_key !== null &&  groupFlow === 1 &&(
                    <div className="group-info">
                        <div className="main-view-group-name">
                            <div>
                                {getSelectedGroupName(groups, selectedGroup)}
                            </div>
                        </div>
                        <div className="two-sides">
                            <div className="users-table-col">
                                <strong className="users-table-header">Group Members - Admin: {groupData.username}</strong>
                                <table className="users-table">
                                    <thead>
                                    <tr className="table-header">
                                        <th className="col-45">Username</th>
                                        <th className="col-45">Access</th>
                                        <th className="col-10" />
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {map(uniqBy(groupData.userList, (user, 'user_id')),((u) => (
                                            <tr key={u.user_id}>
                                                <td>{u.username}</td>
                                                <td>User</td>
                                                <td>{groupData.username === user.username && <div className="remove-icon" onClick={showRemoveMemberModal(u.user_id)}/>}</td>
                                            </tr>
                                    )))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="buttons-col">
                                {groupData.username === user.username && <Button className="button group-main-view-button" onClick={addGroupPassword}>Add password</Button>}
                                {groupData.username === user.username && <Button className="button group-main-view-button" onClick={groupSettings}>Group settings</Button>}
                                <Button className="button group-main-view-button" onClick={() => {groupPasswords(); getGroupPasswords(token, setGroupPasswords, selectedGroup, error)}}>Passwords</Button>
                                {groupData.username === user.username && <Button className="button group-main-view-button" onClick={showAddMemberModal}>Add member</Button>}
                            </div>
                        </div>
                    </div>
                )}
                {selectedGroup !== undefined  && user.public_key !== null && groupFlow === 2 && (
                    <div className="group-info">
                        <div className="main-view-group-name">
                            <div>
                                {getSelectedGroupName(groups, selectedGroup)} - Add password
                            </div>
                        </div>
                        <div className="add-group-pass">
                            <div>
                                <span className="add-group-pass-label">Password name</span>
                                <Input type="text" id="add-pass-name"/>
                            </div>
                            <div>
                                <span className="add-group-pass-label">Login</span>
                                <Input type="text" id="add-pass-login"/>
                            </div>
                            <div>
                                <span className="add-group-pass-label">Password</span>
                                <Input type="password" id="add-pass-pass"/>
                            </div>
                            <div className="inline-block">
                                <span className="add-group-pass-label">Description</span>
                                <div className="inline-block">
                                    <textarea className="input-textarea" id="add-pass-desc"/>
                                    <div className="add-group-pass-buttons-container">
                                        <Button className="button add-group-pass-button" onClick={switchToMainGroupPanel}>Cancel</Button>
                                        <Button className="button add-group-pass-button" onClick={() => {addPasswordForGroup(token, groupData, selectedGroup, user, error); switchToMainGroupPanel();}}>Add</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
                {selectedGroup !== undefined && user.public_key !== null && groupFlow === 3 && (
                    <div className="group-info">
                        <div className="main-view-group-name">
                            <div>
                                {getSelectedGroupName(groups, selectedGroup)} - Settings
                            </div>
                            <div className="button-group">
                                <Button className="margin-right" onClick={deleteGroup(token, selectedGroup, deleteFromGroups)}>Delete group</Button>
                            </div>
                        </div>
                        <div className="group-form">
                            <div className="group-input">
                                <span className="group-input__item">Group name</span>
                                <Input className="group-input__item wide200" type="text" placeholder={getSelectedGroupName(groups, selectedGroup)} />
                            </div>
                            <div className="group-input">
                                <span className="group-input__item">Secret password</span>
                                <Input className="group-input__item wide200" type="password" disabled />
                                <Button className="group-input__item" onClick={() => {console.log('to be implemented')}}>Generate</Button>
                            </div>
                            <div className="add-group-pass-buttons-container">
                                <Button className="button add-group-pass-button" onClick={switchToMainGroupPanel}>Cancel</Button>
                                <Button className="button add-group-pass-button" onClick={() => {switchToMainGroupPanel(); error('Edit group - to be implemented');}}>Accept</Button>
                            </div>
                        </div>

                    </div>
                )}
                {selectedGroup !== undefined && user.public_key !== null && groupFlow === 4 && (
                    <div className="group-info">
                        <div className="main-view-group-name">
                            <div>
                                {getSelectedGroupName(groups, selectedGroup)} - Shared passwords
                            </div>
                        </div>
                        <div className="group-form">
{/*                            <div className="group-input">
                                <span className="group-input__item">Secret password</span>
                                <Input className="group-input__item wide200" type="password" />
                                <Button className="group-input__item" onClick={() => {console.log('to be implemented')}}>Submit</Button>
                                <div className="back-button-container">
                                    <Button className="group-input__item" onClick={switchToMainGroupPanel}>Back</Button>
                                </div>
                            </div>*/}
                            <div className="back-button-container">
                                <Button className="group-input__item" onClick={switchToMainGroupPanel}>Back</Button>
                            </div>
                            <strong className="users-table-header users-table-header--passwords margin-bottom">Group Passwords - Admin: {groupData.username}</strong>
                            {encodedGroupPasswords.map((e, index) => (
                                <div key={index} className="group-input margin-top">
                                    <span className="group-input__item">{e.name}:</span>
                                    <span className="group-input__item">{e.login}</span>
                                    <Input className="group-input__item wide200" type="text" value={e.decryptedPass} disabled/>
                                    <Button className="group-input__item" onClick={showPasswordModal(index)}>Show</Button>
                                </div>
                            ))}
                            {/*<div className="group-input margin-top">
                                <span className="group-input__item">Facebook:</span>
                                <span className="group-input__item">fblogin</span>
                                <Input className="group-input__item wide200" type="password" disabled/>
                                <Button className="group-input__item" onClick={showPasswordModal(0)}>Show</Button>
                            </div>
                            <div className="group-input margin-top">
                                <span className="group-input__item">Gmail:</span>
                                <span className="group-input__item">gmaillogin</span>
                                <Input className="group-input__item wide200" type="password" disabled/>
                                <Button className="group-input__item" onClick={showPasswordModal(1)}>Show</Button>
                            </div>
                            <div className="group-input margin-top">
                                <span className="group-input__item">Jira:</span>
                                <span className="group-input__item">jiralogin</span>
                                <Input className="group-input__item wide200" type="password" disabled/>
                                <Button className="group-input__item" onClick={showPasswordModal(2)}>Show</Button>
                            </div>*/}
                        </div>
                    </div>
                )}
            </div>
        </div>
        {modalAddMemberVisible && (
            <Modal title="Enter user email">
                <Input type="text" id="input-modal-new-member-id"/>
                <div className="modal-buttons">
                    <Button className="margin-top button-wide" onClick={addMember(token, selectedGroup, hideAddMemberModal, error, setGroupData)}>
                        Add member
                    </Button>
                    <Button className="margin-top button-wide" onClick={hideAddMemberModal}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        )}
        {modalRemoveMemberVisible && (
            <Modal title="Are you sure you want to remove user from group?">
                {/*<Input type="text" id="input-modal-remove-member-id"/>*/}
                <div className="modal-buttons">
                    <Button className="margin-top button-wide" onClick={removeMember(token, selectedGroup, hideRemoveMemberModal, toBeRemovedId, error, setGroupData)}>
                        Remove member
                    </Button>
                    <Button className="margin-top button-wide" onClick={hideRemoveMemberModal}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        )}
        {modalShowPasswordVisible && (
            <Modal title="Enter your private key password?">
                <Input type="password" id="input-modal-decode-password"/>
                <div className="modal-buttons">
                    <Button className="margin-top button-wide" onClick={decryptPass(pickedPassToShow, addDecryptedPassToStore, hidePasswordModal)}>
                        Encode password
                    </Button>
                    <Button className="margin-top button-wide" onClick={hidePasswordModal}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        )}
    </div>
);

export default Groups;