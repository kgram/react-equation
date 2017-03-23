import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import { Editor, EditorState, RichUtils } from 'draft-js'
import * as mathjax from 'react-mathjax'

import 'draft-js/dist/Draft.css'

import classes from './stories.scss'
import './style.scss'

import {
    Equation,
    Operator,
    fraction,
    Power,
} from '.'

import * as moment from 'moment'

function getPersistantState(): EditorState {
    return (window as any).persistantEditorState || EditorState.createEmpty()
}

function setPersistantState(editorState: EditorState) {
    (window as any).persistantEditorState = editorState
}

export default class EditorWrapper extends React.PureComponent<{}, { editorState: EditorState }> {
    editor: Editor

    constructor(props: {}) {
        super(props)
        this.state = { editorState: getPersistantState() }
    }

    onChange = (editorState: EditorState) => {
        this.setState({ editorState })
        setPersistantState(editorState)
        action('onChange')(editorState)
    }

    makeModifier(fn: (editorState: EditorState, ...args: any[]) => EditorState, ...args: any[]) {
        return () => {
            this.onChange(fn(this.state.editorState, ...args))
            this.editor.focus()
        }
    }

    render() {
        return (
            <div>
                <div className={classes.toolbar}>
                    <button onClick={this.makeModifier(RichUtils.toggleInlineStyle, 'BOLD')}>eq</button>
                </div>
                <div className={classes.editor}>
                    <Editor
                        ref={(el) => this.editor = el}
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}
