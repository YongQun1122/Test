import Page from "@components/App/Page";
import React from "react";
import styles from "../styles/Home.module.css";
import { PlusOutlined, LeftSquareOutlined, RightSquareOutlined, EditOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { DatePicker, Space } from 'antd';

const HomePage: React.FC<any> = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  const [linkUrl, setLinkUrl] = React.useState("");
  const [dueDate, setDueDate] = React.useState(Date || "");
  const getToday = new Date();
  let setToday = Date();
  if ((getToday.getMonth() + 1) < 10) {
    if (getToday.getDate() < 10) {
      setToday = getToday.getFullYear() + '-0' + (getToday.getMonth() + 1) + '-0' + getToday.getDate();
    }
    else {
      setToday = getToday.getFullYear() + '-0' + (getToday.getMonth() + 1) + '-' + getToday.getDate();
    }
  }
  else {
    if (getToday.getDate() < 10) {
      setToday = getToday.getFullYear() + '-' + (getToday.getMonth() + 1) + '-0' + getToday.getDate();
    }
    else {
      setToday = getToday.getFullYear() + '-' + (getToday.getMonth() + 1) + '-' + getToday.getDate();
    }
  }
  const [dueDateEditing, setDueDateEditing] = React.useState(null);

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json || "");
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (todo != "") {
      const newTodo = {
        id: new Date().getTime(),
        text: todo,
        tagging: "IN PROGRESS",
        fontSize: 30,
        fontWeight: 500,
        linkUrl: "",
        dueDate: setToday
      };
      setTodos(([...todos] as any).concat(newTodo));
    }
    setTodo("");
  };

  const deleteTodo = (id: any) => {
    const updatedTodos = [...todos].filter((todo) => (todo as any).id !== id);
    setTodos(updatedTodos);
  };

  const toggletagging = (id: any, _tagging: any) => {
    const updatedTodos = [...todos].map((todo) => {
      if ((todo as any).id === id) {
        (todo as any).tagging = _tagging;
        console.log(_tagging);
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const submitEdits = (id: any) => {
    if (editingText != "") {
      const updatedTodos = [...todos].map((todo) => {
        if ((todo as any).id === id) {
          (todo as any).text = editingText;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
    if (linkUrl != "") {
      const updatedTodos = [...todos].map((todo) => {
        if ((todo as any).id === id) {
          (todo as any).linkUrl = linkUrl;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
    if (dueDate != "") {
      const updatedTodos = [...todos].map((todo) => {
        if ((todo as any).id === id) {
          (todo as any).dueDate = dueDate;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
    setTodoEditing(null);
    setEditingText("");
    setLinkUrl("");
    setDueDate("");
  };

  const clearTodos = () => {
    setTodos([]);
  };

  const changeSW = (id: any, _type: any) => {
    if (_type === "s1") {
      const updatedTodos = [...todos].map((todo) => {
        if ((todo as any).id === id) {
          if ((todo as any).fontSize > 20) {
            (todo as any).fontSize -= 1;
          }
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
    if (_type === "s2") {
      const updatedTodos = [...todos].map((todo) => {
        if ((todo as any).id === id) {
          if ((todo as any).fontSize < 40) {
            (todo as any).fontSize += 1;
          }
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
    if (_type === "w1") {
      const updatedTodos = [...todos].map((todo) => {
        if ((todo as any).id === id) {
          if ((todo as any).fontWeight > 100) {
            (todo as any).fontWeight -= 100;
          }
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
    if (_type === "w2") {
      const updatedTodos = [...todos].map((todo) => {
        if ((todo as any).id === id) {
          if ((todo as any).fontWeight < 1000) {
            (todo as any).fontWeight += 100;
          }
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
  };

  const handleDatePicker = (date: any) => {
    setDueDate(date.format("YYYY-MM-DD"));
  };

  const handleDueDate = (dueDate: any) => {
    if (dueDate < setToday) {
      setDueDateEditing(dueDate);
    }
    else {
      setDueDateEditing(null);
    }
  };

  return (
    <Page>
      <body className={styles.background}>
        <div className={styles.wrapper}>
          <header>Todo App</header>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputField}>
              <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} placeholder="Add your new todo"></input>
              <button type="submit"><PlusOutlined /></button>
            </div>
          </form>
          <ul className={styles.todoList}>
            {
              todos.map((todo) => (
                <div key={(todo as any).id} className={styles.listWrapper}>
                  <div>
                    {
                      (todo as any).tagging === "HOLD" ? (
                        <>
                          <button className={styles.hoTagging} onClick={() => toggletagging((todo as any).id, "IN PROGRESS")}>HOLD</button>
                        </>
                      ) : (
                        <>
                          <button className={styles.inTagging} onClick={() => toggletagging((todo as any).id, "HOLD")}>IN PROGRESS</button>
                        </>
                      )
                    }
                    {
                      (todo as any).id === todoEditing ? (
                        <>
                          <input type="text" className={styles.textField} style={{ fontSize: (todo as any).fontSize, fontWeight: (todo as any).fontWeight }} onChange={(e) => setEditingText(e.target.value)} defaultValue={(todo as any).text} />
                          <button className={styles.buttonSubmit} onClick={() => submitEdits((todo as any).id)}><CheckOutlined /></button>
                          <br />
                          <br />
                          <br />
                          <div className={styles.editWrapper}>
                            Font Size: <button onClick={() => changeSW((todo as any).id, "s1")}><LeftSquareOutlined /></button>{(todo as any).fontSize}<button onClick={() => changeSW((todo as any).id, "s2")}><RightSquareOutlined /></button>
                            <br />
                            Font Weight: <button onClick={() => changeSW((todo as any).id, "w1")}><LeftSquareOutlined /></button>{(todo as any).fontWeight}<button onClick={() => changeSW((todo as any).id, "w2")}><RightSquareOutlined /></button>
                            <br />
                            Link Url: <input type="text" className={styles.linkField} onChange={(e) => setLinkUrl(e.target.value)} defaultValue={(todo as any).linkUrl} />
                            <br />
                            Due Date: <Space direction="vertical"><DatePicker format={"YYYY-MM-DD"} onChange={handleDatePicker}></DatePicker></Space>
                          </div>
                          <button className={styles.buttonDelete} onClick={() => deleteTodo((todo as any).id)}><DeleteOutlined /></button>
                        </>
                      ) : (
                        <>
                          <button className={styles.buttonEdit} onClick={() => setTodoEditing((todo as any).id)}><EditOutlined /></button>
                          <div className={styles.textBox} style={{ fontSize: (todo as any).fontSize, fontWeight: (todo as any).fontWeight }}>{(todo as any).text}</div>
                          <a href={(todo as any).linkUrl} className={styles.linkBox}>{(todo as any).linkUrl}</a>
                          {
                            (todo as any).dueDate === dueDateEditing ? (
                              <>
                                <div className={styles.dateBox2} onChange={() => handleDueDate((todo as any).dueDate)}>{(todo as any).dueDate}</div>
                              </>
                            ) : (
                              <>
                                <div className={styles.dateBox1} onChange={() => handleDueDate((todo as any).dueDate)}>{(todo as any).dueDate}</div>
                              </>
                            )
                          }
                        </>
                      )
                    }
                  </div>
                </div>
              ))
            }
          </ul>
          <div className={styles.footer}>
            <span>You have <span>{todos.length}</span> pending tasks</span>
            <button onClick={clearTodos}>Clear All</button>
          </div>
        </div>
      </body>
    </Page>
  );
};

// export const getServerSideProps: GetServerSideProps = async (_context): Promise<{ props: Props }> => {
//   try {
//     const home = await apolloClient.query<Gql.GetCurrentHomeBannerQuery>({ query: Gql.GetCurrentHomeBannerDocument });
//     const ads = await apolloClient.query<Gql.GetCurrentAdsBannerQuery>({ query: Gql.GetCurrentAdsBannerDocument });
//     return {
//       props: {
//         homeBanner: home.data.getCurrentHomeBanner,
//         adsBanner: ads.data.getCurrentAdsBanner
//       }
//     };
//   } catch (e) {
//     return { props: {} };
//   }
// };

export default HomePage;
