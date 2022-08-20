export default function KeyPad(props) {
  const buttonPressed = (e) => {
    props.buttonPressed(e.target.name);
  };

  return (
    <div className="buttons">
      <button name="(" onClick={buttonPressed}>
        (
      </button>
      <button name=")" onClick={buttonPressed}>
        )
      </button>
      <button name="C" onClick={buttonPressed}>
        C
      </button>
      <button name="CE" onClick={buttonPressed}>
        CE
      </button>

      <button name="7" onClick={buttonPressed}>
        7
      </button>
      <button name="8" onClick={buttonPressed}>
        8
      </button>
      <button name="9" onClick={buttonPressed}>
        9
      </button>
      <button name="/" onClick={buttonPressed}>
        /
      </button>

      <button name="4" onClick={buttonPressed}>
        4
      </button>
      <button name="5" onClick={buttonPressed}>
        5
      </button>
      <button name="6" onClick={buttonPressed}>
        6
      </button>
      <button name="*" onClick={buttonPressed}>
        *
      </button>

      <button name="1" onClick={buttonPressed}>
        1
      </button>
      <button name="2" onClick={buttonPressed}>
        2
      </button>
      <button name="3" onClick={buttonPressed}>
        3
      </button>
      <button name="-" onClick={buttonPressed}>
        -
      </button>

      <button name="0" onClick={buttonPressed}>
        0
      </button>
      <button name="." onClick={buttonPressed}>
        .
      </button>
      <button name="+" onClick={buttonPressed}>
        +
      </button>
      <button name="=" onClick={buttonPressed}>
        =
      </button>
    </div>
  );
}
