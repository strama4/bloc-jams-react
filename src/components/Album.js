import React, { Component } from 'react';

class Album extends Component {
    render() {
        return (
            <section className="album">
                {this.props.match.params.slug} This will be album information
            </section>
        );        
    }
} 

export default Album;