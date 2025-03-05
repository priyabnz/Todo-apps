import { Card, Input, Popconfirm, Switch } from "antd";
import { useRecoilValue } from "recoil";
import { todosState } from "../../../state/app-state";
import { DeleteIcon } from "../../../components/Icons/DeleteIcon";
import { useUpdateTodo } from "../../../hooks/useUpdateTodo";
import { useSwitchStatus } from "../../../hooks/useSwitchStatus";
import { useDeleteTodo } from "../../../hooks/useDeleteTodo";
import { useState } from "react";

export function TodoCard(props) {
  const todo = useRecoilValue(todosState(props.todoId));

  const [updateTodo, updateContext] = useUpdateTodo();
  const [swicthStatus, switchContext] = useSwitchStatus();
  const [deleteTodos, contextHolder] = useDeleteTodo();

  const [title, setTitle] = useState(todo?.title);
  const [description, setDescription] = useState(todo?.description);
  const [fieldUpdating, setFieldUpdating] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);

  const onConfirmDelete = async () => {
    if (isDeleting) return;
    setisDeleting(true);
    await deleteTodos(props.todoId);
    setisDeleting(false);
  };

  const onSwitchStatus = async (checked) => {
    if (isUpdating) return;
    setIsUpdating(true);
    await swicthStatus(props.todoId, checked ? "done" : "pending");
    setIsUpdating(false);
  };
  const updateField = (field) => {
    if (fieldUpdating) return;
    setFieldUpdating(field);

    const payload = { _id: props.todoId };

    if (field === "description") payload["description"] = description;
    else payload["title"] = title;

    updateTodo(payload);
    setFieldUpdating(null);
  };
  return (
    <Card
      title={
        <Input
          value={title}
          variant="borderless"
          onChange={(e) => setTitle(e.currentTarget.value)}
          onPressEnter={() => updateField("title")}
          disabled={fieldUpdating === "title"}
        />
      }
      actions={[
        <Popconfirm
          title="Are you sure you want to delete this todo?"
          okText="Delete"
          okButtonProps={{
            danger: true,
            disabled: isDeleting,
            loading: isDeleting,
          }}
          cancelButtonProps={{ disabled: isDeleting }}
          onConfirm={onConfirmDelete}
        >
          <DeleteIcon height={24} width={24} />
        </Popconfirm>,
        <Switch
          checkedChildren="Done"
          unCheckedChildren="Pending"
          onChange={onSwitchStatus}
          loading={isUpdating}
          disabled={isUpdating}
          value={todo?.status === "done"}
        />,
      ]}
    >
      <Input.TextArea
        placeholder="Description"
        variant="borderless"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        onPressEnter={() => updateField("description")}
        disabled={fieldUpdating === "description"}
      />
    </Card>
  );
}
