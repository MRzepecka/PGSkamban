using System;
using System.Collections.Generic;
using System.Text;

namespace Pgs.Kanban.Domain.Dtos
{
    public class CardDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ListId { get; set; }
        public string Description { get; set; }

    }
}
