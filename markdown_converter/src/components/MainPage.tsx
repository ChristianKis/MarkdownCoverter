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
            <div>
                <div>
                    <label>Input markdown</label>
                    <textarea onChange={(e) => this.setState({ inputText: e.target.value })}></textarea>
                </div>
                <div>
                    <label>Output html</label>
                    <textarea value={this.state.html} readOnly></textarea>
                </div>
                <button onClick={this.renderHtml}>Submit</button>
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