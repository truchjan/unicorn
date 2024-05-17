package cz.truchjan.unicorn.repository;

import cz.truchjan.unicorn.model.Link;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LinkRepository extends JpaRepository<Link, Long> {
}
