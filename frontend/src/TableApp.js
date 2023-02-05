import React from "react";
import ReactDOM from "react-dom";
import Table from 'react-bootstrap/Table';

const TableApp = (props) => {
    const percentages = props.getPercentage();
    return(
        <>
            {percentages && Object.keys(percentages).length > 0 && (
                <Table bordered style={{width: "70%", margin : "auto", color:"white"}}>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Word Type</th>
                    <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Total Words</td>
                    <td>{percentages.total}</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Percentage of Nouns</td>
                    <td>{percentages.nouns}</td>
                    </tr>
                    <tr>
                    <td>3</td>  
                    <td>Percentage of Pronouns</td>
                    <td>{percentages.pronouns}</td>
                    </tr>
                    <tr>
                    <td>4</td>
                    <td>Percentage of Adjectives</td>
                    <td>{percentages.adjectives}</td>
                    </tr>
                    <tr>
                    <td>5</td>
                    <td>Percentage of Adverbs</td>
                    <td>{percentages.adverbs}</td>
                    </tr>
                </tbody>
                </Table>
            )}
        </>
    )
}

export default TableApp;