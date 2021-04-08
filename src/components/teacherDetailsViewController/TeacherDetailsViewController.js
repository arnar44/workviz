import React from 'react';

function TeacherDetailsViewController(props) {

    const { name, teacher } = props;

    return (
        <div className='Teacher-Details' >
            <p>{name}</p>
            <p>{teacher.Position}</p>
        </div>
    )
}

export default TeacherDetailsViewController;