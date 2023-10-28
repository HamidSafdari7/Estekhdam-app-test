import { useState, useEffect } from 'react'
import Wrapper from '../../assets/wrappers/AllUsersWrapper'
import { ImInfo } from 'react-icons/im'
import { IoSettingsSharp } from 'react-icons/io5'
import { FiDelete } from 'react-icons/fi'
import Swal from 'sweetalert2';
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PER_PAGE = 4;

const AllUsers = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [query, setQuery] = useState("");
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        imageUrl: ''
    });
    const [openmodal, setOpenmodal] = useState(false);




    useEffect(() => {
        fetch("https://reqres.in/api/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.data);
                setCurrentPage(0);
            });
    }, []);


    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;

    const currentPageData = users.slice(offset, offset + PER_PAGE);

    const pageCount = Math.ceil(users.length / PER_PAGE);


    const handleInfoClick = (user) => {
        setSelectedUser(user);
    };

    const handleEditClick = async (user) => {
        try {
            const response = await axios.get(`https://reqres.in/api/users/${user.id}`);
            setEditUser(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://reqres.in/api/users/${editUser.id}`, {
                first_name: firstName,
                last_name: lastName,
                email: email
            });
            setUsers(users.map(user => user.id === editUser.id ? response.data : user));
            setEditUser(null);
        } catch (error) {
            console.error(error);
        }
    };


    const handleDeleteClick = async (user) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${user.first_name} ${user.last_name}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://reqres.in/api/users/${user.id}`);
                setUsers(users.filter(u => u.id !== user.id));
                setSelectedUser(null);
                Swal.fire({
                    title: 'Deleted!',
                    text: `${user.first_name} ${user.last_name} has been deleted.`,
                    icon: 'success'
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred while deleting the user.',
                    icon: 'error'
                });
            }
        }
    };



    const filterUsers = currentPageData.filter((x) => {
        if (query === '') {
            return true;
        } else if (x.first_name.toLowerCase().includes(query.toLowerCase()) || x.last_name.toLowerCase().includes(query.toLowerCase())) {
            return true;
        }
        return false;
    });


    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };


    const handleAddUser = (event) => {
        event.preventDefault();
        // Perform validation here
        if (!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.phone || !newUser.address) {
            toast.error('Please provide all values');

        } else if (!/^[\u0600-\u06FF\s]+$/.test(newUser.first_name) || !/^[\u0600-\u06FF\s]+$/.test(newUser.last_name)) {
            toast.error('نام و نام خانوادگی باید فارسی باشد');

        } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
            toast.error('Provide a valid email');

        } else if (newUser.phone < 11) {
            toast.error('Phone must be 11 digits');
        }
        else {
            // Send the request to add the new user
            axios.post('https://reqres.in/api/users', newUser)
                .then((response) => {
                    // Handle success
                    toast.success('User added successfully');
                    // Clear the form inputs
                    setNewUser({
                        first_name: '',
                        last_name: '',
                        email: '',
                        phone: '',
                        address: '',
                        imageUrl: ''
                    });
                })
                .catch((error) => {
                    // Handle error
                    toast.error('Failed to add user');
                });
        }

    };



    return (
        <Wrapper>
            <div className='form-row'>
                <label className='form-label'>
                    Search
                </label>
                <input className='form-input' type="text" placeholder="Search users..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>

            <button type="submit" className='btn btn-danger' onClick={() => setOpenmodal(true)}>Add User</button>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Info</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Del</th>
                    </tr>
                </thead>
                <tbody>
                    {filterUsers.map((user) => (
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td ><ImInfo onClick={() => handleInfoClick(user)} /></td>
                            <td><IoSettingsSharp onClick={() => handleEditClick(user)} /></td>
                            <td><FiDelete onClick={() => handleDeleteClick(user)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editUser && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setEditUser(null)}>
                            &times;
                        </span>
                        <div className='modal-infoes'>

                            <img src={editUser.avatar} alt={editUser.first_name} />
                            <form className='edit-modal-infoes' onSubmit={handleSaveClick}>

                                <div className='form-row'>
                                    <label className='form-label'>
                                        First Name
                                    </label>
                                    <input
                                        className='form-input'
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder={editUser.first_name}
                                    />
                                </div>

                                <div className='form-row'>
                                    <label className='form-label'>
                                        Last Name
                                    </label>
                                    <input
                                        className='form-input'
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder={editUser.last_name}
                                    />
                                </div>

                                <div className='form-row'>
                                    <label className='form-label'>
                                        Email
                                    </label>
                                    <input
                                        className='form-input'
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={editUser.email}
                                    />
                                </div>



                                <button type="submit" className='btn btn-block'>Edit</button>
                            </form>

                        </div>
                    </div>
                </div>
            )}

            {selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSelectedUser(null)}>
                            &times;
                        </span>
                        <div className='modal-infoes'>

                            <img src={selectedUser.avatar} alt={selectedUser.first_name} />
                            <h2>{selectedUser.first_name} {selectedUser.last_name}</h2>
                            <h5>Email: {selectedUser.email}</h5>

                        </div>
                    </div>
                </div>
            )}


            {openmodal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setOpenmodal(false)}>
                            &times;
                        </span>
                        <div className='modal-infoes'>

                            <h2>Add User</h2>

                            <div className='form-row'>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={newUser.first_name}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                />
                            </div>

                            <div className='form-row'>
                                
                                <input
                                    type="text"
                                    name="last_name"
                                    value={newUser.last_name}
                                    onChange={handleInputChange}
                                    placeholder="last Name"
                                />
                            </div>

                            <div className='form-row'>
                                
                                <input
                                    type="email"
                                    name="email"
                                    value={newUser.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                />
                            </div>

                            <div className='form-row'>
                                
                                <input
                                    type="text"
                                    name="phone"
                                    value={newUser.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                />
                            </div>

                            <div className='form-row'>
                                
                                <input
                                    type="text"
                                    name="address"
                                    value={newUser.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                />
                            </div>

                            <div className='form-row'>
                                
                                <input
                                    type="text"
                                    name="imageUrl"
                                    value={newUser.imageUrl}
                                    onChange={handleInputChange}
                                    placeholder="Image Url"
                                />
                            </div>

                            <button type="submit" className='btn btn-block' onClick={handleAddUser}>Add</button>

                        </div>
                    </div>
                </div>
            )}

            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />


            <ToastContainer />
        </Wrapper>
    )
}

export default AllUsers
