function fontSize(val) {
   const valStrSize = val.toString().length;
    switch(valStrSize) {
    case 1:
    case 2:
    case 3:
    case 4:
      return '1.6em';
    case 5:
    case 6:
      return '1.4em';
    case 7:
    case 8:
    case 9:
      return '1.3em';
    default:
      return '1.2em';
    }
 }

function StackValue(props) {
  const { val, idx, label } = props;
  const style = `font-size: ${fontSize(val)}`;
  return `
    <div class="stack__value">
      <span style="${style}">${val}</span>
      ${label}
    </div>
  `;
}

function pointersLabel(pointers) {
  return function(val, idx) {
    let ps = "";
    for (const label in pointers) {
      if (pointers[label] == idx) {
        ps += `<li>${label}</li>`;
      }
    }

    if (ps) {
      return `<div class="stack__pointer"><div>←</div><ul>${ps}</ul></div>`;
    } else {
      return "";
    }
  };
}

class Stack {
  constructor(props) {
    this.props = props;

    this.stack = [...props.stack];
    this.stack.length = Math.max(props.stack.length, props.minSize);
    this.stack.fill("", props.stack.length);
    this.stackLabel = pointersLabel(props.pointers);
  }

  render() {
    const stackValues = this.stack.map((val, idx) => {
      const label = this.stackLabel(val, idx);
      return StackValue({ val, idx, label });
    }).reverse();

    return `
      <div class="stack">
        <div class="stack__top"></div>
          ${stackValues.join("")}
        <div class="stack__bottom"></div>
      </div>
    `;
  }
}

const stack = new Stack({
  stack: ["cref_or_me"],
  minSize: 5,
  pointers: { sp: 0, bp: 0, rsp: 0 }
});

document.write(stack.render());
