import React from 'react'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import ReactMarkdown from 'react-markdown'

export default class Letters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: '',
      title: '',
      content: '',
    }
  }
  render() {
    const { letters, save, add, remove } = this.props
    const { editing, title, content } = this.state
    return (
      <div style={{ padding: '15px 0 65px' }}>
        { letters.map((letter, key) => <Card key={ key } style={{ marginBottom: 15 }}>
          { key !== editing && <CardTitle title={ letter.get('title') }/> }
          { key !== editing && <CardText><ReactMarkdown source={ letter.get('content') }/></CardText> }
          { key === editing && <CardText>
            <div>
              <TextField hintText="Titlu" fullWidth value={ title } onChange={ (_, title) => this.setState({ title }) }/>
              <TextField hintText="Mesaj" fullWidth multiLine rows={ 5 } value={ content } onChange={ (_, content) => this.setState({ content }) }/>
            </div>
          </CardText> }
          <CardActions>
            <RaisedButton label={ key === editing ? 'Salvează' : 'Editează' } primary onTouchTap={ () => key === editing ? save(key, title, content) && this.setState({ editing: '', title: '', content: '' }) : this.setState({ editing: key, title: letter.get('title'), content: letter.get('content') }) }/>
            <FlatButton label="Sterge" primary onTouchTap={ () => remove(key) }/>
          </CardActions>
        </Card>).toArray() }
        <FloatingActionButton style={{ position: 'fixed', bottom: 15, right: 15 }} onTouchTap={ () => this.setState({ editing: 'add', title: '', content: '' }) }>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog title="Adaugă mesaj nou" open={ editing === 'add' } onRequestClose={ () => this.setState({ editing: '', title: '', content: '' }) } actions={[
          <RaisedButton primary label="Salvează" onTouchTap={ () => add(title, content) && this.setState({ editing: '', title: '', content: '' }) }/>,
          <FlatButton primary label="Anulează" onTouchTap={ () => this.setState({ editing: '', title: '', content: '' }) } style={{ margin: '0 15px' }}/>
        ]}>
          <TextField hintText="Titlu" fullWidth value={ title } onChange={ (_, title) => this.setState({ title }) }/>
          <TextField hintText="Mesaj" fullWidth multiLine rows={ 5 } value={ content } onChange={ (_, content) => this.setState({ content }) }/>
        </Dialog>
      </div>
    )
  }
}
