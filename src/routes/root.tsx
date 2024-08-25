import React from 'react';
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

function Root() {
    return (
        <>
            <Button>Click me</Button>
            <Button>
                <Link to={'/login'}>Login</Link>
            </Button>
        </>
    );
}

export default Root;