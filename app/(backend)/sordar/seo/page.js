

import { getRoutes } from '@/lib/directories/dir'
import React from 'react'

const SEO = async() => {
    const routes = await getRoutes()
    console.log(routes)
    
      

  return (
    <div>
        <h1>SEO Routes</h1>
        {
            routes.map((route, index) => (
                <div key={index}>
                    <p>
                        <strong>Route:</strong> {route.route}
                    </p>
                    
                </div>
            ))
        }


    </div>
  )
}

export default SEO