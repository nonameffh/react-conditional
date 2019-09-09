# Conditional rendering 

## Install

NPM
```shell script
npm install --save-dev @nonameffh/react-conditional
```

## 'If' components

### Children

Then, Else, ElseIf

### Usage

```javascript
class Example extends React.Component {
    render() {
        return (
            <div>
                <If condition={this.state.value === "test"}>
                    <Then>Test</Then>
                    <ElseIf condition={this.state.value === "not test"}>Not test</ElseIf>
                    <Else>Unknown value</Else>
                </If>  
            </div> 
        );
    }
}
```

## 'Switch' components 

### Children

Case, Default

### Usage

```javascript
class Example extends React.Component {
    render() {
        return (
            <div>
                <Switch value={this.state.value} strict={false}>
                    <Case condition={"test1"}>Test1 case</Case>
                    <Case condition={"test2"}>Test2 case</Case>
                    <Default>Anything else</Default>
                </Switch>
            </div> 
        );
    }
}
```

## ForEach component

### Usage

```javascript
class Item extends React.Component {
    render() {
        return (
            <div key={this.props.index}>value: {this.props.item}</div>        
        );            
    }
}
class Example extends React.Component {
    public constructor(props) {
        super(props);
        this.state = {
            items: [
                "red", "green", "orange"            
            ]                   
        };    
    }
    render() {
        return (
            <div>
               <ForEach for={this.state.items}>
                    <Item/>
                </ForEach>
            </div> 
        );
    }
}
```


## ForIn component

### Usage

```javascript
class Item extends React.Component {
    render() {
        return (
            <div key={this.props.index}>value: {this.props.item}</div>        
        );            
    }
}
class Example extends React.Component {
    public constructor(props) {
        super(props);
        this.state = {
            value: {prop1:"red",prop2:"green",prop3:"orange"}                   
        };    
    }
    render() {
        return (
            <div>
               <ForIn for={this.state.items}>
                    <Item/>
                </ForIn>
            </div> 
        );
    }
}
```