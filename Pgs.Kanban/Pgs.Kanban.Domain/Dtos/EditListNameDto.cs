namespace Pgs.Kanban.Domain.Dtos
{
    public class EditListNameDto
    {
        public string Name { get; set; }
        public int ListId { get; set; }
        public int BoardId { get; set; }
    }
}
