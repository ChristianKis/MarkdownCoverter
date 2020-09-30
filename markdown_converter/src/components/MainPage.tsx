import React from 'react';
import { MarkdownConverter } from '../models/MarkdownConverter';

export interface MainPageProps {

}

export interface MainPageState {
    inputText: string;
    html: string;
}

export class MainPage extends React.Component<MainPageProps, MainPageState> {
    private markdownConverter: MarkdownConverter;

    constructor(props: MainPageProps) {
        super(props);
        this.markdownConverter = new MarkdownConverter();

        this.state = {
            inputText: "",
            html: ""
        };
    }

    render() {
        return (
            <div className="container">
                <div className="form-group">
                    <label>Input markdown</label>
                    <textarea onChange={(e) => this.setState({ inputText: e.target.value })}
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label>Output html</label>
                    <div dangerouslySetInnerHTML={{__html: this.state.html}}>
                    </div>
                </div>
                <button onClick={this.renderHtml} className="btn btn-primary">Submit</button>
            </div>
        )
    }

    renderHtml = () => {
        const htmlString = this.markdownConverter.convert(this.state.inputText);

        this.setState({
            html: htmlString
        });
    };
}