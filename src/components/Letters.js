import React from 'react'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const letters = [{
  title: "Vino să donezi, oferă o șansă!",
  content: "Donarea de sânge este un gest altruist care salvează vieți. Fiecare dintre noi poate fi un salvator de vieți, poate oferi unor persoane șansa zilei de mâine și speranța la sănătate. \n\n Nevoia de sânge este permanentă deoarece toate intervențiile chirurgicale majore (politraumatisme, bolile oncologice, transplantul de măduvă sau de ficat etc) nu s-ar putea realiza fără transfuzii de sânge. \n\n Donatorii de sânge sunt atent monitorizați din punct de vedere a stării de sănătate, iar actul de donare nu reprezintă nici-un risc dacă acesta este sănătos. În plus, studii recente au demonstrat că donarea de sânge reduce cu 30% riscul apariției bolilor cardiovasculare prin scăderea tensiunii arteriale și că donatorii de sânge trăiesc mai mult decât media populației."
}, {
  title: "Cum donezi?",
  content: "Puteți dona sânge o dată la trei luni în centrele de transfuzii sau la centrele mobile de donare aflate în campusuri universitare, instituții, întreprinderi etc. Aici găsiți centrele de transfuzii din fiecare județ.",
}, {
  title: "Recomandări înainte de donare",
  content: "Înainte de a veni la centrul de donare se recomandă să nu fumați, să nu consumați alcool, mâncăruri bogate în grăsimi sau dulciuri concentrate. Fi-ți bine hidratat, odihnit și asigurați-vă că aveți o stare de igiena corespunzătoare. Nu luați medicamente anticoagulante, antidiabetice sau aspirină.",
}]

export default class Letters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: -1,
    }
  }
  render() {
    console.log(this.props.letters.toJS())
    return (
      <div style={{ padding: '15px 0' }}>
        { letters.map((letter, key) => <Card key={ key } style={{ marginBottom: 15 }}>
          <CardTitle title={ letter.title }/>
          { key !== 0 && <CardText>{ letter.content }</CardText> }
          { key === 0 && <CardText>
            <div>
              <TextField hintText="Titlu" fullWidth value={ letter.title }/>
              <TextField hintText="Mesaj" fullWidth multiLine rows={ 5 } value={ letter.content }/>
            </div>
          </CardText> }
          <CardActions>
            <RaisedButton label={ key === 0 ? 'Salvează' : 'Editează' } primary/>
            <FlatButton label="Sterge" primary/>
          </CardActions>
        </Card>) }
        <FloatingActionButton style={{ position: 'fixed', bottom: 15, right: 15 }}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}
