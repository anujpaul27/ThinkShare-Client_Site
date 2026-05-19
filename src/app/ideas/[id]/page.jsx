import React from 'react';

const IdeaDetailsPage = async ({params}) => {
    const {id} = await params;
    return (
        <div>
            {id}
        </div>
    );
};

export default IdeaDetailsPage;